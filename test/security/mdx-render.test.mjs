import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { mdxRemoteOptions } from "../../lib/mdx/mdx-options.mjs";

const root = path.resolve(import.meta.dirname, "..", "..");

const passthrough = ({ children }) => createElement(Fragment, null, children);

// Stubs for every MDX component referenced by app/_docs/server-toast.mdx.
const components = {
  Tabs: passthrough,
  TabsList: passthrough,
  TabsTrigger: passthrough,
  TabsContent: passthrough,
  ComponentView: passthrough,
  ServerToastExamples: () => null,
  CodeBlock: passthrough,
  CommandBlock: ({ pnpmCommand }) =>
    createElement("pre", { "data-stub": "CommandBlock" }, pnpmCommand),
  CopyCode: ({ code }) =>
    createElement("pre", { "data-stub": "CopyCode" }, code),
};

const renderDoc = async (source) => {
  const { content } = await compileMDX({
    source,
    options: mdxRemoteOptions,
    components,
  });
  return renderToStaticMarkup(content);
};

describe("MDX rendering with the app's shared MDXRemote options", () => {
  test("options keep JS expressions but block dangerous ones explicitly", () => {
    assert.equal(mdxRemoteOptions.blockJS, false);
    assert.equal(mdxRemoteOptions.blockDangerousJS, true);
  });

  test("server-toast doc renders the CopyCode code prop", async () => {
    const raw = fs.readFileSync(
      path.join(root, "app", "_docs", "server-toast.mdx"),
      "utf-8",
    );
    const { content } = matter(raw);

    const html = await renderDoc(content);

    const copyCode = /<pre data-stub="CopyCode">([\s\S]*?)<\/pre>/.exec(html);
    assert.ok(copyCode, "CopyCode stub was not rendered");
    assert.ok(
      copyCode[1].includes(
        "await serverToast(&quot;Post saved successfully!&quot;, &quot;success&quot;);",
      ),
      `CopyCode code prop was stripped, got: ${JSON.stringify(copyCode[1].slice(0, 200))}`,
    );
  });

  test("every doc in app/_docs compiles with the shared options", async () => {
    const docsDir = path.join(root, "app", "_docs");
    const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".mdx"));
    assert.ok(files.length > 0);
    for (const file of files) {
      const { content } = matter(
        fs.readFileSync(path.join(docsDir, file), "utf-8"),
      );
      await assert.doesNotReject(
        serialize(content, mdxRemoteOptions, true),
        `${file} failed to compile`,
      );
    }
  });

  test("dangerous expressions are rejected", async () => {
    await assert.rejects(renderDoc(`{eval("1+1")}`), /Security: /);
    await assert.rejects(
      renderDoc(`<CopyCode code={process.env.HOME} />`),
      /Security: /,
    );
    await assert.rejects(
      renderDoc(`{[].constructor.constructor("return 1")()}`),
      /Security: /,
    );
  });
});
