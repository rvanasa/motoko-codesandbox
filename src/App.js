import "./styles.css";

import { useState } from "react";
import CodeEditor from "./CodeEditor";

const defaultCode = `
actor {
  public func hello() : async Text() {
    "Hello, world!"
  }
}
`.trim();

export default function App() {
  const [value, setValue] = useState(defaultCode);

  return (
    <div className="App">
      <CodeEditor height="100vh" value={value} onChange={setValue} />
    </div>
  );
}

console.log(document.referrer);
