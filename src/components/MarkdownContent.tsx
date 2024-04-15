import React from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchMarkdownContent } from '@/utils/markdown';
import remarkGfm from 'remark-gfm';
import remarkHeadings from 'remark-heading-id';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div className="markdown-content prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkHeadings]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="markdown-h1" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="markdown-h2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="markdown-h3" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="markdown-h4" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="markdown-h5" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="markdown-h6" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="markdown-link" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="markdown-paragraph" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="markdown-hr" {...props} />
          ),
          code: ({ node, ...props }) => (
            <SyntaxHighlighter language="javascript" style={dark} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;