import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import stripMarkdown from "strip-markdown";
import type { Plugin } from "unified";
import { unified } from "unified";
import { VFile } from "vfile";
import { matter } from "vfile-matter";

const attachMatter: Plugin = () => {
  return (tree, file) => {
    matter(file);
  };
};

function isRecord(input: object): input is Record<string, unknown> {
  return Object.keys(input).every((key) => typeof key === "string");
}

function getFrontmatter(vfile: VFile): Record<string, unknown> {
  if ("matter" in vfile.data && typeof vfile.data.matter === "object" && vfile.data.matter && isRecord(vfile.data.matter)) {
    return vfile.data.matter;
  }
  return {};
}

const loadMarkdown = unified().use(remarkParse).use(remarkFrontmatter).use(attachMatter);
const foo = unified().use(attachMatter);
const toPlainText = unified().use(stripMarkdown);
const toHtml = unified().use(remarkRehype);

const toHtmlString = unified().use(rehypeStringify);
const toPainTextString = unified().use(remarkStringify);
export type Result = {
  frontmatter: Record<string, unknown>;
  html: string;
  plain: string;
};

export async function parseDocument(template: string): Promise<Result> {
  const templateVFile = new VFile({
    value: template,
  });

  const markdownRoot = loadMarkdown.parse(templateVFile);

  await foo.run(markdownRoot, templateVFile);

  const htmlRoot = await toHtml.run(markdownRoot, templateVFile);
  const plainRoot = await toPlainText.run(markdownRoot, templateVFile);

  const html = toHtmlString.stringify(htmlRoot);
  const plain = toPainTextString.stringify(plainRoot);

  const frontmatter = getFrontmatter(templateVFile);
  return {
    frontmatter,
    html,
    plain,
  };
}
