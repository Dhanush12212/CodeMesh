import { Box } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import React,{useState, useRef} from 'react' 
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';

function CodeEditor() {

  const [value, setValue] = useState(CODE_SNIPPETS["JavaScript"]);
  const [language, setLanguage] = useState('JavaScript')
  const editorRef = useRef(null);

  //Focus on the Editor
  const handleOnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  }

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language])
  }

  return (
    <Box>
      <LanguageSelector language={language} onSelect={onSelect}/>
      <Editor 
        height="90vh" 
        theme='vs-dark'  
        value={value} 
        language={language}
        onMount={handleOnMount}
        onChange={(value) =>setValue(value)}  
      />
    </Box>
  )
}

export default CodeEditor