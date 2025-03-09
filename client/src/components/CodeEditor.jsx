import { Box } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import React,{useState, useRef} from 'react' 
import LanguageSelector from './LanguageSelector';

function CodeEditor() {

  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('JavaScript')
  const editorRef = useRef(null);

  const handleOnMount = (editor) => {
    editor.current = editor;
    editor.focus();
  }

  const onSelect = (language) => {
    setLanguage(language);
  }

  return (
    <Box>
      <LanguageSelector language={language} onSelect={onSelect}/>
      <Editor 
        height="90vh" 
        theme='vs-dark'  
        value={value}
        ref={editorRef}
        onMount={handleOnMount}
        onChange={(value,event) =>setValue(value)}  
        defaultValue="// some comment" 
      />
    </Box>
  )
}

export default CodeEditor