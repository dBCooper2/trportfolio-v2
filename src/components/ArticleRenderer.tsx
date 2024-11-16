// ArticleRenderer.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { HeadingLink, InitialScrollHandler } from "./HeadingLink";

export const ArticleRenderer: React.FC<ArticleRendererProps> = ({
  article,
  content,
}) => {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Create heading components without nesting anchor tags
  const createHeadingComponent = (level: string) => {
    return ({ children, id }: { children: React.ReactNode; id?: string }) => {
      if (!id) {
        return React.createElement(
          level,
          { className: `markdown-${level} scroll-mt-16` },
          children,
        );
      }

      return React.createElement(
        level,
        { id, className: `markdown-${level} scroll-mt-16` },
        <HeadingLink id={id} className="anchor-link !no-underline">
          {children}
        </HeadingLink>,
      );
    };
  };

  return (
    <article className="min-h-screen w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-oldStandardTT">
      <InitialScrollHandler />
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <time className="text-cBody text-sm">{formattedDate}</time>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="tag-button bg-cTag text-cBg tag-button-hover"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown
          className="markdown-content"
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[
            rehypeKatex,
            rehypePrism,
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  className: ["anchor-link"],
                },
              },
            ],
          ]}
          components={{
            h1: createHeadingComponent("h1"),
            h2: createHeadingComponent("h2"),
            h3: createHeadingComponent("h3"),
            h4: createHeadingComponent("h4"),
            h5: createHeadingComponent("h5"),
            h6: createHeadingComponent("h6"),
            p: ({ children }) => (
              <p className="markdown-paragraph">{children}</p>
            ),
            a: ({ href, children }) => (
              <a href={href} className="markdown-link">
                {children}
              </a>
            ),
            hr: () => <hr className="markdown-hr my-8" />,
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                className="rounded-lg shadow-lg max-w-full h-auto my-4"
              />
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-8">
                <table className="min-w-full divide-y divide-cLineBreak">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-cBody uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-cBody">
                {children}
              </td>
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              // Ensure children is joined as a string
              const codeString = Array.isArray(children)
                ? children.join("")
                : String(children);

              // Render block code
              if (!inline && match) {
                return (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg my-4"
                    {...props}
                  >
                    {codeString.trim()}
                  </SyntaxHighlighter>
                );
              }

              // Render inline code
              return (
                <code
                  className="bg-gray-900 text-white px-1 py-0.5 rounded"
                  {...props}
                >
                  {codeString.trim()}
                </code>
              );
            },
            em: ({ children }) => <em className="italic">{children}</em>,
            strong: ({ children }) => (
              <strong className="font-bold">{children}</strong>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-cLineBreak pl-4 italic my-4">
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};
