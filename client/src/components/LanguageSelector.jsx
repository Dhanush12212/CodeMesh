import { Box, MenuButton, MenuList, Menu, MenuItem, Text, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { LANGUAGE_VERSIONS } from '../constants';

const languages = Object.entries(LANGUAGE_VERSIONS);

function LanguageSelector({ language, onSelect }) {
  return (
    <Box>
      <Text mb={2} fontSize={['md', 'lg']} color="gray.300" fontWeight="medium">
        Languages:
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="gray.700"
          _hover={{ bg: "gray.600" }}
          _expanded={{ bg: "gray.600" }}
          color="gray.100"
          fontWeight="semibold"
        >
          {language}
        </MenuButton>
        <MenuList
          fontSize={['sm', 'md', 'lg']}
          fontWeight="semibold"
          bg="gray.800"
          borderColor="gray.700"
          color="gray.200"
        >
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              onClick={() => onSelect(lang)}
              color={lang === language ? "teal.300" : "gray.200"}
              bg={lang === language ? "gray.700" : "transparent"}
              _hover={{
                color: "teal.300",
                bg: "gray.700",
              }}
            >
              {lang} &nbsp;&nbsp;
              <Text as="span" color="gray.400">({version})</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default LanguageSelector;
