import "./styles.css";

import { useState, useMemo } from "react";
import CodeEditor from "./CodeEditor";
import { Motoko } from "motoko";

const defaultCode =
  `
actor Main {
  public func hello() : async Text {
    "Hello, world!"
  };
};

await Main.hello()
`.trim() + "\n";

export default function App() {
  const [value, setValue] = useState(defaultCode);

  const output = useMemo(() => {
    try {
      Motoko.saveFile("Main.mo", value);
      return Motoko.run([], "Main.mo");
    } catch (err) {
      return { stderr: err.message || String(err) };
    }
  }, [value]);

  const consoleHeight = 100;

  return (
    <div className="App">
      <CodeEditor
        value={value}
        onChange={setValue}
        height={`calc(100vh - ${consoleHeight}px)`}
      />
      {!!output && (
        <div
          style={{
            fontSize: 14,
            padding: "5px 20px",
            textAlign: "left",
            maxWidth: "100vw",
            maxHeight: consoleHeight,
            overflowY: "auto"
          }}
        >
          {!!output.stdout && (
            <pre style={{ color: "lightgreen", overflow: "auto" }}>
              {output.stdout}
            </pre>
          )}
          {!!output.stderr && (
            <pre style={{ color: "pink", opacity: 0.8, overflow: "auto" }}>
              {output.stderr}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
