import { Box, MenuButton, MenuList, Menu, MenuItem, Text, Button } from '@chakra-ui/react' 
import { ChevronDownIcon } from 'lucide-react'
import React from 'react' 
import { LANGUAGE_VERSION } from '../constants';

const languages = Object.entries( LANGUAGE_VERSION );

function LanguageSelector({language,onSelect}) {
  return (
    <Box>  
      <Text mb={2} fontSize='lg'>Languages: </Text>
      <Menu> 
        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
          {language}
        </MenuButton>
        <MenuList>
          {
            languages.map(([language, version]) => (
              <MenuItem key={language} onClick={()=>onSelect(language)}> {language} 
                &nbsp;
                &nbsp;
                <Text key={version} > {version} </Text>
              </MenuItem>
            )) 
          }
        </MenuList>
      </Menu>
    </Box>
  )
}

export default LanguageSelector