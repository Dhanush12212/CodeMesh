import axios from 'axios';
import { LANGUAGE_VERSION } from './constants'; 

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
});

export const executeCode = async (language, sourceCode) => {
    const payload = { 
        "language": language,
        "version": LANGUAGE_VERSION[language],
        "files": [
            { 
                "name": "main",
                "content": sourceCode
            }
        ]
    };

    console.log("Sending Payload:", JSON.stringify(payload, null, 2));

    const response = await API.post('/execute', payload);
    return response.data;
};
