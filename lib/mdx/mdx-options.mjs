import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/**
 * Shared MDXRemote options, plain ESM so `node --test` can import them.
 *
 * Docs are trusted repo files that pass JSX attribute expressions such as
 * `<CopyCode code={`...`} />`, so `blockJS` is disabled. `blockDangerousJS`
 * stays on to reject eval, process, constructor access, etc.
 *
 * @type {NonNullable<import("next-mdx-remote/rsc").MDXRemoteProps["options"]>}
 */
export const mdxRemoteOptions = {
  blockJS: false,
  blockDangerousJS: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
          defaultLang: "tsx",
        },
      ],
    ],
  },
};
