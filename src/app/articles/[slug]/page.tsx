// src/app/articles/[slug]/page.tsx
import ArticleContent from "@/components/ArticleContent";
import BlogHeader from "@/components/BlogHeader";
import BlogSidebar from "@/components/BlogSidebar";
import articles from "@/content/articles.json";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="bg-cBg">
      <div className="w-full">
        <BlogHeader />
      </div>
      <div className="flex">
        <BlogSidebar articles={articles} currentSlug={params.slug} />
        <main className="flex-1">
          <ArticleContent params={params} />
        </main>
      </div>
    </div>
  );
}

// We can keep using the exports from ArticleContent since they're server-side functions
export {
  generateStaticParams,
  generateMetadata,
} from "@/components/ArticleContent";
