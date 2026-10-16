import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { describe, test } from "node:test";

const root = path.resolve(import.meta.dirname, "..", "..");

const readJson = (filePath) =>
  JSON.parse(fs.readFileSync(path.resolve(root, filePath), "utf-8"));

const STRICT_SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

const parseStrictSemver = (version) => {
  const match = STRICT_SEMVER.exec(version);
  if (!match) return null;
  return match.slice(1, 4).map(Number);
};

const compare = (a, b) => {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
};

const isAtLeast = (version, minimum) => {
  const parsed = parseStrictSemver(version);
  if (!parsed) return false;
  return compare(parsed, minimum) >= 0;
};

// Minimum patched version per reviewed major. Unknown majors fail closed.
// GHSA-2464-fhr4-w9xw / GHSA-p3m5-59mp-jv5r: fixed in 15.5.28 and 16.4.1.
const NEXT_MINIMUM_BY_MAJOR = {
  15: [15, 5, 28],
  16: [16, 4, 1],
};

// GHSA-2464-fhr4-w9xw workaround: sharp used by Next.js must be >= 0.35.5.
const SHARP_MINIMUM = [0, 35, 5];

const isSafeNextVersion = (version) => {
  const parsed = parseStrictSemver(version);
  if (!parsed) return false;
  const minimum = NEXT_MINIMUM_BY_MAJOR[parsed[0]];
  if (!minimum) return false;
  return compare(parsed, minimum) >= 0;
};

const isSafeSharpVersion = (version) => isAtLeast(version, SHARP_MINIMUM);

describe("next version guard", () => {
  test("strict semver parser rejects ranges, prereleases and build metadata", () => {
    assert.deepEqual(parseStrictSemver("15.5.28"), [15, 5, 28]);
    assert.equal(parseStrictSemver("^15.5.28"), null);
    assert.equal(parseStrictSemver("~15.5.28"), null);
    assert.equal(parseStrictSemver(">=15.5.28"), null);
    assert.equal(parseStrictSemver("15.6.0-canary.1"), null);
    assert.equal(parseStrictSemver("15.5.28+build.1"), null);
    assert.equal(parseStrictSemver("15.5"), null);
    assert.equal(parseStrictSemver("015.5.28"), null);
    assert.equal(parseStrictSemver("latest"), null);
  });

  test("guard accepts only patched versions of reviewed majors", () => {
    assert.equal(isSafeNextVersion("15.5.7"), false);
    assert.equal(isSafeNextVersion("15.5.24"), false);
    assert.equal(isSafeNextVersion("15.5.27"), false);
    assert.equal(isSafeNextVersion("15.5.28"), true);
    assert.equal(isSafeNextVersion("15.6.0"), true);
    assert.equal(isSafeNextVersion("15.6.0-canary.1"), false);
    assert.equal(isSafeNextVersion("^15.5.28"), false);
    assert.equal(isSafeNextVersion("16.0.0"), false);
    assert.equal(isSafeNextVersion("16.2.11"), false);
    assert.equal(isSafeNextVersion("16.4.0"), false);
    assert.equal(isSafeNextVersion("16.4.1"), true);
    assert.equal(isSafeNextVersion("14.2.35"), false);
    assert.equal(isSafeNextVersion("17.0.0"), false);
  });

  test("sharp guard requires >= 0.35.5", () => {
    assert.equal(isSafeSharpVersion("0.34.4"), false);
    assert.equal(isSafeSharpVersion("0.34.5"), false);
    assert.equal(isSafeSharpVersion("0.35.4"), false);
    assert.equal(isSafeSharpVersion("0.35.5"), true);
    assert.equal(isSafeSharpVersion("0.36.0"), true);
    assert.equal(isSafeSharpVersion("^0.35.5"), false);
    assert.equal(isSafeSharpVersion("0.35.5-rc.1"), false);
  });
});

describe("dependency versions", () => {
  const manifest = readJson("package.json");

  test("next is pinned exactly to a patched version and installed accordingly", () => {
    const declared = manifest.dependencies.next;
    assert.ok(
      parseStrictSemver(declared),
      `package.json next must be an exact version, got "${declared}"`,
    );
    assert.ok(
      isSafeNextVersion(declared),
      `package.json next ${declared} is vulnerable or unreviewed`,
    );

    const installed = readJson("node_modules/next/package.json").version;
    assert.ok(
      isSafeNextVersion(installed),
      `installed next ${installed} is vulnerable or unreviewed`,
    );
  });

  test("next-mdx-remote is pinned to 6.0.0 and installed accordingly", () => {
    assert.equal(manifest.dependencies["next-mdx-remote"], "6.0.0");
    assert.equal(
      readJson("node_modules/next-mdx-remote/package.json").version,
      "6.0.0",
    );
  });

  test("sharp override is pinned exactly to a patched version", () => {
    const override = manifest.pnpm?.overrides?.sharp;
    assert.ok(
      parseStrictSemver(override ?? ""),
      `package.json pnpm.overrides.sharp must be an exact version, got "${override}"`,
    );
    assert.ok(
      isSafeSharpVersion(override),
      `pnpm.overrides.sharp ${override} is below 0.35.5`,
    );
  });

  test("sharp resolved from the installed next package is patched", () => {
    const nextDir = fs.realpathSync(path.join(root, "node_modules", "next"));
    const requireFromNext = createRequire(path.join(nextDir, "package.json"));
    // sharp >= 0.35 does not export ./package.json, so resolve the entry point
    // next loads and walk up to the package manifest.
    let dir = path.dirname(requireFromNext.resolve("sharp"));
    while (!fs.existsSync(path.join(dir, "package.json"))) {
      assert.notEqual(path.dirname(dir), dir, "sharp package.json not found");
      dir = path.dirname(dir);
    }
    const sharpPackageJson = path.join(dir, "package.json");
    const { name, version } = readJson(sharpPackageJson);
    assert.equal(name, "sharp");
    assert.ok(
      isSafeSharpVersion(version),
      `sharp resolved from next is ${version} (${sharpPackageJson}), expected >= 0.35.5`,
    );
  });

  test("lockfile only resolves patched sharp versions", () => {
    const lockfile = fs.readFileSync(path.join(root, "pnpm-lock.yaml"), "utf-8");
    const versions = [
      ...lockfile.matchAll(/^ {2}sharp@([^:\s(]+)/gm),
    ].map((match) => match[1]);
    assert.ok(versions.length > 0, "no sharp entry found in pnpm-lock.yaml");
    for (const version of versions) {
      assert.ok(
        isSafeSharpVersion(version),
        `pnpm-lock.yaml resolves sharp@${version}, expected >= 0.35.5`,
      );
    }
  });
});
