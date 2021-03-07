import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

const RCE = () => {
  const hanndleEditorDidMount = (editor: any) => {
    console.log(editor);
  };

  return (
    <MonacoEditor
      height={'90vh'}
      theme={'vs-dark'}
      editorDidMount={hanndleEditorDidMount}
    />
  );
};

export default RCE;
