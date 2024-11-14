import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Articles from "@/components/Articles";
import MarkdownContent from "@/components/MarkdownContent";

import { fetchMarkdownContent } from "@/utils/markdown";

import "tailwindcss/tailwind.css";
import Head from "./head";

export default async function HomePage() {
  const abstractContent = await fetchMarkdownContent("src/content/Abstract.md");
  const educationContent = await fetchMarkdownContent(
    "src/content/Education.md",
  );
  const experienceContent = await fetchMarkdownContent(
    "src/content/Experience.md",
  );
  const certificateContent = await fetchMarkdownContent(
    "src/content/Certificates.md",
  );
  // const researchContent = await fetchMarkdownContent('src/content/Research.md');
  const footerContent = await fetchMarkdownContent("src/content/Footer.md");

  // Tailwind Breakpoints: none/sm: Phones, md: Tablets, lg: Desktop, xl: Widescreen Desktop

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-cBg font-font px-8 py-24 relative overflow-y-auto">
      <div className="bg-cBg lg:w-full px-6 lg:px-20 lg:sticky lg:top-0 lg:left-0 lg:min-h-1/3 lg:order-1">
        <Head />
      </div>
      <div className="flex-row bg-cBg px-6 lg:px-12 py-8 grid grid-cols-1 gap-10 lg:order-2">
        <div id="Abstract">
          <MarkdownContent content={abstractContent} />
        </div>
        <div id="Skills">
          <Skills />
        </div>
        <div id="Projects">
          <Projects />
        </div>
        <div id="Education">
          <MarkdownContent content={educationContent} />
        </div>
        <div id="Articles">
          <Articles />
        </div>
        <div id="Experience">
          <MarkdownContent content={experienceContent} />
        </div>
        <div id="Certificates">
          <MarkdownContent content={certificateContent} />
        </div>
        <div id="Footer">
          <MarkdownContent content={footerContent} />
        </div>
      </div>
    </div>
  );
}
