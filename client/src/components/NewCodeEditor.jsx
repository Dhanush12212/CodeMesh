import { Box, Flex } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import { socket } from '../socket/socket';

function NewCodeEditor({ roomId }) {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState(CODE_SNIPPETS['javascript']);
  const editorRef = useRef(null);

  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', roomId);

    socket.on('languageChange', ({ roomId: updatedRoomId, language }) => {
      if (updatedRoomId === roomId) {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
        console.log(`Language updated in room ${roomId}: ${language}`);
      }
    });

    socket.on('updatedCode', ({ roomId: updatedRoomId, code }) => {
      if (updatedRoomId === roomId && code !== value) {
        console.log(`Code updated in room ${roomId}: ${code.length} chars`);
        setValue(code);
      }
    });

    return () => {
      socket.off('languageChange');
      socket.off('updatedCode');
    };
  }, [roomId]);

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);
    socket.emit('languageChange', { roomId, selectedLanguage });
  };

  const handleOnChange = (newCode) => {
    setValue(newCode);
    socket.emit('updatedCode', { roomId, newCode });
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <Flex direction="column" width="100vw" height="100vh" bg="gray.900">
      
      {/* Top Toolbar */}
      <Box 
        p={3} 
        bg="gray.800" 
        borderBottom="1px solid" 
        borderColor="gray.700"
        shadow="sm"
      >
        <LanguageSelector language={language} onSelect={onSelect} />
      </Box>

      {/* Fullscreen Editor */}
      <Box flex="1" overflow="hidden">
        <Editor
          options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 12 } }}
          height="100%"
          width="100%"
          theme="vs-dark"
          value={value}
          language={language}
          onMount={onMount}
          onChange={handleOnChange}
        />
      </Box>
    </Flex>
  );
}

export default NewCodeEditor;
