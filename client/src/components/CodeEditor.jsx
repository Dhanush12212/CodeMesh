import { Box, HStack } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import React,{useState, useRef} from 'react' 
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';

function CodeEditor() {

  const [language, setLanguage] = useState('javascript')
  const [value, setValue] = useState(CODE_SNIPPETS['javascript']);
  const editorRef = useRef();

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
      <HStack spacing={4}>

        <Box width='50%' mt={3}> 
          <LanguageSelector language={language} onSelect={onSelect}/>
          <Editor 
            options={{
              minimap: {
              enabled: false,
              },
            }}
            height="80vh" 
            theme='vs-dark'  
            value={value} 
            language={language}
            onMount={handleOnMount}
            onChange={(value) =>setValue(value)}  
          /> 
        </Box> 

        <Output editorRef={editorRef} language={language} />

      </HStack>
    </Box>
  )
}

export default CodeEditor;