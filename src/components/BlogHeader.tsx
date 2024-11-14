import Link from "next/link";

export default function BlogHeader() {
  return (
    <header className="border-b border-cLineBreak py-4 mb-6">
      <nav className="container mx-auto px-4">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="markdown-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className="markdown-link">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/articles" className="markdown-link">
              Articles
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
