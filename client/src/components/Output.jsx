import { Button, Box, Text } from '@chakra-ui/react' 
import React from 'react'
import { executeCode } from '../api';

function Output({editorRef, language}) {

    const runCode = async() => {
        const sourceCode = editorRef.current.getValue();
        
        console.log(sourceCode);
        
        if(!sourceCode) 
            return;

        try {
            const result = await executeCode(language, sourceCode);
            console.log("Executed Result: ", result);
            
        } catch(error) {
            console.error(JSON.stringify({
                message: "Failed To Execute",
                error: error.message,
            }))
        }

    }

  return (
    <Box width='50%'>
        <Text fontSize='lg' mb={2}>
            OutPut
        </Text>
        <Button 
            variant='outline'
            colorScheme='green'
            mb={4}
            onClick={runCode}
        >
            Run Code
        </Button>

        <Box
            height='80vh'
            p={2}
            border='1px solid'
            borderRadius={4}
            borderColor='#333'
        > 
        Tets the output here
        </Box>
    </Box>
  )
}

export default Output