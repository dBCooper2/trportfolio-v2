import 'tailwindcss/tailwind.css';

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cBg font-oldStandardTT">
      <h1 className="markdown-h1 mb-8">Contact</h1>
      <div className="text-cBody max-w-md px-4 text-left">
        <p>
          <a href="mailto:t.rowland711@gmail.com" className="block text-cLink hover:text-cLinkHover hover:underline hover:font-bold">Email: t.rowland711@gmail.com</a>
          <a
            href="https://www.linkedin.com/in/trevor-rowland711/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-cLink hover:text-cLinkHover hover:underline hover:font-bold"
          >
            LinkedIn: Trevor Rowland
          </a>
          <a
            href="https://github.com/dBCooper2"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-cLink hover:text-cLinkHover hover:underline hover:font-bold"
          >
            GitHub: dBCooper2
          </a>
        </p>
      </div>
    </div>
  );
}