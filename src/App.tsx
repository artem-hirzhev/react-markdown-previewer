import { useState } from 'react';
import './App.scss';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const text = '# The largest heading\n## The second largest heading\n###### The smallest heading\n\nText that is not a quote\n> Text that is a quote\n\n1. First ordered list item\n2. Another item\n\n[I\'m an inline-style link](https://www.google.com)\n\n![This is an image](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)\n\n```javascript\nvar s = \"JavaScript syntax highlighting\";\nalert(s);\n```\n \n```python\ns = \"Python syntax highlighting\"\nprint s\n```\nInline `code`. And this is a **strong** text.\n';

function App() {
  const [markdown, setMarkdown] = useState(text);

  const handleChange = (value) => {
    setMarkdown(value);
  };

  return (
    <div className="App">
      <div className="previewer">
        <h1 className="previewer__title">Markdown Previewer</h1>

        <textarea
          className="previewer__editor"
          id="editor"
          value={markdown}
          onChange={(e) => handleChange(e.target.value)}
          autoFocus
        />

        <div
          className="previewer__preview"
          id="preview"
        >
          <ReactMarkdown
            children={markdown}
            components={{
              code({
                node, inline, className, children, ...props
              }) {
                const match = /language-(\w+)/.exec(className || '');

                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={anOldHope}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
