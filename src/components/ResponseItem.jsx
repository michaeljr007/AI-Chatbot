import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy } from "react-icons/fa";

const formatText = (text) => {
  // Escape any HTML tags
  const escapedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Replace **bold** with <b>bold</b>
  let formattedText = escapedText.replace(
    /\*\*\*(.*?)\*\*\*/g,
    "<b><i>$1</i></b>"
  ); // Bold and italic
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"); // Bold
  formattedText = formattedText.replace(/\*(.*?)\*/g, "<i>$1</i>"); // Italic
  formattedText = formattedText.replace(
    /`([^`]+)`/g,
    '<code class="inline-code">$1</code>'
  ); // Inline code
  formattedText = formattedText.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  ); // Link

  return formattedText;
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {
      alert("Copied to clipboard!");
    },
    (err) => {
      console.error("Could not copy text: ", err);
    }
  );
};

const ResponseItem = ({ response }) => {
  const parts = response.split(/(```[\s\S]*?```)/g); // Split by code blocks

  const handleCopyAll = () => {
    copyToClipboard(response);
  };

  return (
    <li className="response-item pl-[1.3rem] pr-[0.8rem] mb-2 rounded-lg mr-1 max-[450px]:ml-[-0.6rem] w-[90vw] lg:w-[80%] bg-zinc-800 py-[1.5rem] relative">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const content = part.slice(3, -3); // Extract code content without ```
          const [language, ...codeLines] = content.split("\n");
          const code = codeLines.join("\n").trim();
          const langLabel = language.trim() || "plaintext";

          return (
            <div key={index} className="relative mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400 ml-2">{langLabel}</span>
                <FaCopy
                  className="cursor-pointer text-white mr-2"
                  onClick={() => copyToClipboard(code)}
                  title="Copy code"
                />
              </div>
              <SyntaxHighlighter
                language={langLabel} // Replace with appropriate language for your code
                style={coy}
                className="code-block"
              >
                {code}
              </SyntaxHighlighter>
            </div>
          );
        } else {
          return (
            <pre
              key={index}
              className="response-pre font-sans w-[100%] whitespace-pre-wrap break-words leading-7 text-white"
              dangerouslySetInnerHTML={{ __html: formatText(part) }}
            />
          );
        }
      })}
      <FaCopy
        className="absolute right-4 bottom-[0.6rem] cursor-pointer text-white"
        onClick={handleCopyAll}
        title="Copy all text"
      />
    </li>
  );
};

export default ResponseItem;
