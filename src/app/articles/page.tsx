import "tailwindcss/tailwind.css";
import ArticlePageCards from "@/components/ArticlesPageCards";
import TagFilter from "@/components/TagFilter";
import BlogHeader from "@/components/BlogHeader";

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#000000] font-oldStandardTT">
      {" "}
      {/* CHANGE THIS WHEN YOU EDIT GLOBAL CSS */}
      {/* Header section with left alignment */}
      <div className="w-full">
        <BlogHeader />
      </div>
      {/* Main content with responsive padding and width constraints */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="markdown-h1 text-left">Articles</h1>
        {/* <TagFilter initialTag={"/articles"} /> */}
        <div className="w-full">
          <ArticlePageCards />
        </div>
      </main>
    </div>
  );
}
