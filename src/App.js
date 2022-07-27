import "./styles.css";

import { useState, useMemo } from "react";
import CodeEditor from "./CodeEditor";
import { Motoko } from "motoko";

const defaultCode = `
actor {
  public func hello() : async Text {
    "Hello, world!"
  }
}
`.trim();

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

  console.log(output);

  return (
    <div className="App">
      {!!output && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            background: "#0005"
          }}
        >
          {!!output.stdout && (
            <pre style={{ color: "lightgreen" }}>{output.stdout}</pre>
          )}
          {!!output.stderr && (
            <pre style={{ color: "pink" }}>{output.stderr}</pre>
          )}
        </div>
      )}
      <CodeEditor value={value} onChange={setValue} height="100vh" />
    </div>
  );
}
