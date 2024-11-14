import React from "react";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import articles from "@/content/articles.json";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// Types for our article metadata
interface Article {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
  filename: string;
}

interface ArticleContentProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticleContentProps) {
  const article = articles.find(
    (article: Article) => article.slug === params.slug,
  );

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export async function generateStaticParams() {
  return articles.map((article: Article) => ({
    slug: article.slug,
  }));
}

const ArticleContent = async ({ params }: ArticleContentProps) => {
  const article = articles.find(
    (article: Article) => article.slug === params.slug,
  );

  if (!article) {
    notFound();
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "_articles",
      article.filename,
    );
    const fileContent = await fs.readFile(filePath, "utf8");

    const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <article className="min-h-screen w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-oldStandardTT">
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
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
            components={{
              h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
              h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
              h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
              h4: ({ children }) => <h4 className="markdown-h4">{children}</h4>,
              h5: ({ children }) => <h5 className="markdown-h5">{children}</h5>,
              h6: ({ children }) => <h6 className="markdown-h6">{children}</h6>,
              p: ({ children }) => (
                <p className="markdown-paragraph">{children}</p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="markdown-link hover:text-cLinkVisited"
                >
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
            {fileContent}
          </ReactMarkdown>
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error rendering article:", error);
    return (
      <div className="min-h-screen w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="markdown-h1">Error Loading Article</h1>
        <p className="markdown-paragraph">
          Sorry, there was an error loading this article. Please try again
          later.
        </p>
        {process.env.NODE_ENV === "development" && (
          <pre className="bg-red-100 p-4 rounded mt-4 text-red-900">
            {error.message}
          </pre>
        )}
      </div>
    );
  }
};

export default ArticleContent;
