import React, { useState } from "react";

const CopyIcon: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span>{textToCopy}</span>
      <button
        onClick={handleCopy}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        {copied ? "✔" : "📋"} 
      </button>
    </div>
  );
};

export default CopyIcon;
