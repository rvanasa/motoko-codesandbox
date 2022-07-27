import MonacoEditor from "@monaco-editor/react";
import { configureMonaco } from "./configureMonaco";
// import useThemeState from "../../hooks/persistent/useThemeState";

export default function CodeEditor({
  value,
  onChange,
  readOnly,
  options,
  ...others
}) {
  // const monaco = useMonaco();
  // const [theme] = useThemeState();
  const theme = "github"; // 'night-owl'

  return (
    <MonacoEditor
      // width="30vh"
      // height="40vh"
      theme={theme}
      defaultLanguage="motoko"
      beforeMount={configureMonaco}
      // onMount={(editor, monaco) => {
      //     setTimeout(() => {
      //         console.log(editor.getAction('editor.action.formatDocument').run());
      //
      //         // console.log(editor.trigger('actor{public func test() : Text {}}', 'editor.action.formatDocument'));
      //     },500);
      // }}
      value={value}
      // path={fileName}
      onChange={(newValue) => onChange?.(newValue)}
      options={{
        tabSize: 2,
        minimap: { enabled: false },
        wordWrap: "off",
        // wrappingIndent: 'indent',
        scrollBeyondLastLine: false,
        fontSize: 16,
        readOnly,
        ...options
      }}
      {...others}
    />
  );
}
