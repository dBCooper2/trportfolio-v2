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

// ... other imports and interfaces

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
        <h1 className="markdown-h1">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <time className="text-cBody text-sm">{formattedDate}</time>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-cTag text-cBg px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-cBody text-lg">{article.description}</p>
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
            h1: ({ children, id }) =>
              id ? (
                <h1 id={id} className="markdown-h1 scroll-mt-16">
                  <HeadingLink id={id} className="anchor-link">
                    {children}
                  </HeadingLink>
                </h1>
              ) : (
                <h1 className="markdown-h1 scroll-mt-16">{children}</h1>
              ),
            h2: ({ children, id }) =>
              id ? (
                <h2 id={id} className="markdown-h2 scroll-mt-16">
                  <HeadingLink id={id} className="anchor-link">
                    {children}
                  </HeadingLink>
                </h2>
              ) : (
                <h2 className="markdown-h2 scroll-mt-16">{children}</h2>
              ),
            h3: ({ children, id }) =>
              id ? (
                <h3 id={id} className="markdown-h3 scroll-mt-16">
                  <HeadingLink id={id} className="anchor-link">
                    {children}
                  </HeadingLink>
                </h3>
              ) : (
                <h3 className="markdown-h3 scroll-mt-16">{children}</h3>
              ),
            h4: ({ children, id }) =>
              id ? (
                <h4 id={id} className="markdown-h4 scroll-mt-16">
                  <HeadingLink id={id} className="anchor-link">
                    {children}
                  </HeadingLink>
                </h4>
              ) : (
                <h4 className="markdown-h4 scroll-mt-16">{children}</h4>
              ),
            h5: ({ children, id }) =>
              id ? (
                <h5 id={id} className="markdown-h5 scroll-mt-16">
                  <HeadingLink id={id} className="anchor-link">
                    {children}
                  </HeadingLink>
                </h5>
              ) : (
                <h5 className="markdown-h5 scroll-mt-16">{children}</h5>
              ),
            h6: ({ children, id }) =>
              id ? (
                <h6 id={id} className="markdown-h6 scroll-mt-16">
                  <HeadingLink id={id} className="anchor-link">
                    {children}
                  </HeadingLink>
                </h6>
              ) : (
                <h6 className="markdown-h6 scroll-mt-16">{children}</h6>
              ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg my-4"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-gray-900 text-white px-1 py-0.5 rounded"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p: ({ children }) => (
              <p className="markdown-paragraph">{children}</p>
            ),
            a: ({ href, children }) => (
              <a href={href} className="markdown-link hover:text-cLinkVisited">
                {children}
              </a>
            ),
            hr: () => <hr className="markdown-hr my-8 border-cLineBreak" />,
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
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg my-4"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-gray-900 text-white px-1 py-0.5 rounded"
                  {...props}
                >
                  {children}
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
