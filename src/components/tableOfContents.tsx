import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { ArticleMetadata } from '@/articles/articlesConfig';
import fs from 'fs/promises';
import path from 'path';
import { Node, Parent } from 'unist';

const TableOfContents = async ({
  metadata,
  className,
}: {
  metadata: ArticleMetadata;
  className?: string;
}) => {
  // 從檔案讀取 Markdown 內容
  const markdown = await fs.readFile(
    path.join(process.cwd(), 'src/articles', metadata.slug + '.mdx'),
    'utf-8'
  );
  const headings: string[] = [];

  // 使用 unified 和 remarkParse 解析 Markdown
  const tree = unified().use(remarkParse).parse(markdown);

  // 遍歷 AST，提取標題
  visit(tree, 'heading', (node: Parent) => {
    const text = node.children
      .filter((child: Node) => child.type === 'text')
      .map((child: Node) => child.data)
      .join('');
    headings.push(text);
  });

  return (
    <div className={className}>
      {headings.map((heading) => (
        <div key={heading}>{heading}</div>
      ))}
    </div>
  );
};
export default TableOfContents;
