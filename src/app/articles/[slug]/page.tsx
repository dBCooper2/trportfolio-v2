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
    <div className="min-h-screen bg-cBg font-oldStandardTT">
      {/* Header section with full width */}
      <header className="w-full">
        <BlogHeader />
      </header>
      {/* Main content area */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-1/5 lg:w-1/6 bg-cBg p-4">
          <BlogSidebar articles={articles} currentSlug={params.slug} />
        </aside>
        {/* Main content */}
        <main className="flex-1 p-4 w-full max-w-7xl mx-auto">
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
