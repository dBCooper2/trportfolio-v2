// src/app/articles/[slug]/page.tsx
import ArticleContent from "@/components/ArticleContent";
import BlogHeader from "@/components/BlogHeader";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-cBg">
      <div className="w-full">
        <BlogHeader />
      </div>
      <ArticleContent params={params} />
    </div>
  );
}

export {
  generateStaticParams,
  generateMetadata,
} from "@/components/ArticleContent";
