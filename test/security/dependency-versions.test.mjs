import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

const root = path.resolve(import.meta.dirname, "..", "..");

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf-8"));

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

// Minimum patched version per reviewed major. Unknown majors fail closed.
const NEXT_MINIMUM_BY_MAJOR = {
  15: [15, 5, 27],
  16: [16, 2, 11],
};

const isSafeNextVersion = (version) => {
  const parsed = parseStrictSemver(version);
  if (!parsed) return false;
  const minimum = NEXT_MINIMUM_BY_MAJOR[parsed[0]];
  if (!minimum) return false;
  return compare(parsed, minimum) >= 0;
};

describe("next version guard", () => {
  test("strict semver parser rejects ranges, prereleases and build metadata", () => {
    assert.deepEqual(parseStrictSemver("15.5.27"), [15, 5, 27]);
    assert.equal(parseStrictSemver("^15.5.27"), null);
    assert.equal(parseStrictSemver("~15.5.27"), null);
    assert.equal(parseStrictSemver(">=15.5.27"), null);
    assert.equal(parseStrictSemver("15.6.0-canary.1"), null);
    assert.equal(parseStrictSemver("15.5.27+build.1"), null);
    assert.equal(parseStrictSemver("15.5"), null);
    assert.equal(parseStrictSemver("015.5.27"), null);
    assert.equal(parseStrictSemver("latest"), null);
  });

  test("guard accepts only patched versions of reviewed majors", () => {
    assert.equal(isSafeNextVersion("15.5.7"), false);
    assert.equal(isSafeNextVersion("15.5.24"), false);
    assert.equal(isSafeNextVersion("15.5.26"), false);
    assert.equal(isSafeNextVersion("15.5.27"), true);
    assert.equal(isSafeNextVersion("15.6.0"), true);
    assert.equal(isSafeNextVersion("15.6.0-canary.1"), false);
    assert.equal(isSafeNextVersion("^15.5.27"), false);
    assert.equal(isSafeNextVersion("16.0.0"), false);
    assert.equal(isSafeNextVersion("16.2.10"), false);
    assert.equal(isSafeNextVersion("16.2.11"), true);
    assert.equal(isSafeNextVersion("14.2.35"), false);
    assert.equal(isSafeNextVersion("17.0.0"), false);
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
});
