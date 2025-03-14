import { Box, HStack } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';
import { socket } from '../socket/socket';

function CodeEditor() {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState(CODE_SNIPPETS['javascript']);
  const editorRef = useRef(null);

  // Focus on the Editor
  const handleOnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);
    socket.emit('languageChange', selectedLanguage); 
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected: ${socket.id}`);
    });

    socket.on('languageChange', (selectedLanguage) => {
      setLanguage(selectedLanguage);
      setValue(CODE_SNIPPETS[selectedLanguage]);
      console.log(`Language changed to: ${selectedLanguage}`);
    });

    socket.on('updatedCode', (newCode) => {
      if (newCode !== value) {
        setValue(newCode);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected: ${socket.id}`);
    });

    return () => {
      socket.off('connect');
      socket.off('languageChange');
      socket.off('updatedCode');
      socket.off('disconnect');
    };
  }, []); // ✅ Empty dependency array to run once

  const handleOnChange = (newCode) => {
    setValue(newCode);
    socket.emit('updatedCode', newCode);
  };

  return (
    <Box width="100%">
      <HStack 
        spacing={4} 
        display={["block", "flex"]}  // Block on small screens, flex on md and larger
        flexDirection={["column", "row"]}
        alignItems="stretch" // Ensure both children stretch properly
      >
        <Box width={["100%", "50%"]} mt={3}>  {/* 100% on mobile, 50% on larger screens */}
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{ minimap: { enabled: false } }}
            height="80vh"
            theme="vs-dark"
            value={value}
            language={language}
            onMount={handleOnMount}
            onChange={handleOnChange}
          />
        </Box>
        <Box width={["100%", "50%"]}> {/* Ensure Output box also adapts */}
          <Output editorRef={editorRef} language={language} />
        </Box>
      </HStack>
    </Box>
  );
  
}

export default CodeEditor;
