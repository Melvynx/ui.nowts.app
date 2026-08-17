import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import test from "node:test";

const minimumSafeVersionByMajor = new Map([
  ["15", [5n, 21n]],
  ["16", [2n, 11n]],
]);

function isPatchedNextVersion(version) {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(version);

  if (!match) {
    return false;
  }

  const minimum = minimumSafeVersionByMajor.get(match[1]);

  if (!minimum) {
    return false;
  }

  const parsedRelease = match.slice(2).map(BigInt);

  for (const [index, minimumPart] of minimum.entries()) {
    const parsedPart = parsedRelease[index];

    if (parsedPart !== minimumPart) {
      return parsedPart > minimumPart;
    }
  }

  return true;
}

const EXPECTED_NEXT_MDX_REMOTE_VERSION = "6.0.0";

function isSafeNextMdxRemoteVersion(version) {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(version);

  return match !== null && BigInt(match[1]) >= 6n;
}

void test("advisory check accepts only patched stable Next.js release lines", () => {
  const cases = [
    ["15.5.20", false],
    ["15.5.21", true],
    ["15.5.22", true],
    ["15.6.0", true],
    ["15.4.99", false],
    ["14.2.99", false],
    ["13.0.0", false],
    ["16.0.0", false],
    ["16.2.10", false],
    ["16.2.11", true],
    ["16.3.0", true],
    ["17.0.0", false],
    ["15.6.0-beta.1", false],
    ["16.0.0-rc.1", false],
    ["15.5.21+build.1", false],
    ["15.6.garbage", false],
    ["15.6", false],
    ["15.5.021", false],
    ["015.5.21", false],
    ["15.05.21", false],
    ["15.5.21.0", false],
  ];

  for (const [version, expected] of cases) {
    assert.equal(isPatchedNextVersion(version), expected, version);
  }
});

void test("Next.js is pinned and resolved to a Server Action DoS-safe version", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../../package.json", import.meta.url), "utf8"),
  );
  const require = createRequire(import.meta.url);
  const resolvedNextPackage = require("next/package.json");

  assert.match(packageJson.dependencies.next, /^\d+\.\d+\.\d+$/, "Next.js must be pinned exactly");
  assert.ok(
    isPatchedNextVersion(packageJson.dependencies.next),
    `package.json pins vulnerable Next.js ${packageJson.dependencies.next}; expected >=15.5.21 on 15.x or >=16.2.11 on 16.x`,
  );
  assert.ok(
    isPatchedNextVersion(resolvedNextPackage.version),
    `installed Next.js ${resolvedNextPackage.version} is vulnerable; expected >=15.5.21 on 15.x or >=16.2.11 on 16.x`,
  );
});

void test("advisory check accepts only stable next-mdx-remote releases at or above 6.0.0", () => {
  const cases = [
    ["5.0.0", false],
    ["5.99.99", false],
    ["6.0.0", true],
    ["6.0.1", true],
    ["7.0.0", true],
    ["6.0.0-beta.1", false],
    ["6.0.0+build.1", false],
    ["06.0.0", false],
    ["6.00.0", false],
    ["6.0.00", false],
    ["6.0", false],
  ];

  for (const [version, expected] of cases) {
    assert.equal(isSafeNextMdxRemoteVersion(version), expected, version);
  }
});

void test("next-mdx-remote is pinned and resolved to a Vercel-approved version", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../../package.json", import.meta.url), "utf8"),
  );
  const require = createRequire(import.meta.url);
  const resolvedPackage = require("next-mdx-remote/package.json");

  assert.equal(
    packageJson.dependencies["next-mdx-remote"],
    EXPECTED_NEXT_MDX_REMOTE_VERSION,
    `package.json must declare next-mdx-remote ${EXPECTED_NEXT_MDX_REMOTE_VERSION} exactly`,
  );
  assert.equal(
    resolvedPackage.version,
    EXPECTED_NEXT_MDX_REMOTE_VERSION,
    `installed next-mdx-remote must resolve to ${EXPECTED_NEXT_MDX_REMOTE_VERSION} exactly`,
  );
  assert.ok(
    isSafeNextMdxRemoteVersion(resolvedPackage.version),
    `installed next-mdx-remote ${resolvedPackage.version} is vulnerable; expected stable >=6.0.0`,
  );
  assert.ok(
    isSafeNextMdxRemoteVersion(packageJson.dependencies["next-mdx-remote"]),
    `package.json declares vulnerable next-mdx-remote ${packageJson.dependencies["next-mdx-remote"]}; expected stable >=6.0.0`,
  );
  assert.match(
    packageJson.dependencies["next-mdx-remote"],
    /^\d+\.\d+\.\d+$/,
    "next-mdx-remote must be pinned exactly",
  );
});
