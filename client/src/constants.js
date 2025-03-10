export const LANGUAGE_VERSION = { 
        "Python": "3.13.2",
        "JavaScript": "18.15.0",
        "Java": "20.12.2",
        "C": "12.1.1",
        "CPP": "18.8.2",
        "CSharp": "13.5.2",
        "PHP": "8.2.3",  
}

export const CODE_SNIPPETS = {
        Python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
        C: `#include <stdio.h>\n\nvoid greet(char name[]) {\n\tprintf("Hello, %s!\\n", name);\n}\n\nint main() {\n\tgreet("Alex");\n\treturn 0;\n}`,
        CPP: `#include <iostream>\nusing namespace std;\n\nvoid greet(string name) {\n\tcout << "Hello, " << name << "!" << endl;\n}\n\nint main() {\n\tgreet("Alex");\n\treturn 0;\n}`,
        JavaScript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
        Java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, Alex!");\n\t}\n}`,
        CSharp: `using System;\n\nnamespace HelloWorld\n{\n\tclass Program {\n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello, Alex!");\n\t\t}\n\t}\n}`,
        PHP: `<?php\n$name = "Alex";\necho "Hello, " . $name . "!";\n?>`
};
      