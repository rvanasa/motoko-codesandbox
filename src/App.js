import "./styles.css";

import { useState, useMemo } from "react";
import { FaCode } from "react-icons/fa";
import { Motoko } from "motoko";
import copy from "copy-to-clipboard";
import CodeEditor from "./CodeEditor";

const EMBED_LINK_BASE =
  "https://codesandbox.io/embed/motoko-44l2v4?view=preview&hidenavigation=1&hidedevtools=1&initialpath=";

const UNCOMPRESSED_FORMAT = "c";

const shareData = window.location.pathname.substring(1);
let defaultCode;
if (shareData) {
  if (shareData.startsWith(UNCOMPRESSED_FORMAT)) {
    try {
      defaultCode = atob(shareData.substring(UNCOMPRESSED_FORMAT.length));
    } catch (err) {
      defaultCode = "// Unable to parse share link";
    }
  }
} else {
  defaultCode =
    `
  // A simple Motoko smart contract.

  actor Main {
    public func hello() : async Text {
      "Hello, world!"
    };
  };

  await Main.hello()
  `.trim() + "\n";
}

export default function App() {
  const [value, setValue] = useState(defaultCode);
  const [message, setMessage] = useState(null);

  const output = useMemo(() => {
    try {
      Motoko.saveFile("Main.mo", value);
      return Motoko.run([], "Main.mo");
    } catch (err) {
      return { stderr: err.message || String(err) };
    }
  }, [value]);

  const copyEmbedLink = () => {
    const format = UNCOMPRESSED_FORMAT;
    const link = `${EMBED_LINK_BASE}${format}${btoa(value)}`;
    if (link.length >= 2048) {
      alert("Your code is too long to fit into a URL!");
      return;
    }
    copy(link);
    setMessage(`Copied share link to clipboard:\n\n${link}`);
    setTimeout(() => setMessage(null), 2000);
  };

  const consoleHeight = 100;

  return (
    <div className="App">
      <CodeEditor
        value={value}
        onChange={setValue}
        height={`calc(100vh - ${consoleHeight}px)`}
      />
      <div className="button-menu">
        <div
          className="button"
          onClick={copyEmbedLink}
          title="Copy share link to clipboard"
        >
          <FaCode />
        </div>
      </div>
      <div
        style={{
          fontSize: 16,
          padding: "5px 20px",
          textAlign: "left",
          maxWidth: "100vw",
          maxHeight: consoleHeight,
          overflowY: "auto"
        }}
      >
        {!!message && (
          <pre style={{ color: "white", overflow: "auto" }}>{message}</pre>
        )}
        {!!output?.stdout && (
          <pre style={{ color: "lightgreen", overflow: "auto" }}>
            {output.stdout}
          </pre>
        )}
        {!!output?.stderr && (
          <pre style={{ color: "pink", opacity: 0.8, overflow: "auto" }}>
            {output.stderr}
          </pre>
        )}
      </div>
    </div>
  );
}
