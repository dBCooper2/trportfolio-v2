// src/components/ArticleContent.tsx
import { notFound } from "next/navigation";
import articles from "@/content/articles.json";
import { ArticleRenderer } from "./ArticleRenderer";
import { getArticleContent } from "@/utils/getArticleContent";

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
    const fileContent = await getArticleContent(article.filename);

    return <ArticleRenderer article={article} content={fileContent} />;
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
            {(error as Error).message}
          </pre>
        )}
      </div>
    );
  }
};

export default ArticleContent;
