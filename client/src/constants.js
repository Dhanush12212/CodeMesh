export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0", 
  php: "8.2.3", 
};
  
  export const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name) {\n\tconsole.log("Start with " + name + "!");\n}\n\ngreet("JavaScript");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Start with " + data.name + "!");\n}\n\ngreet({ name: "TypeScript" });\n`,
    python: `\ndef greet(name):\n\tprint("Start with " + name + "!")\n\ngreet("Python")\n`,
    java: `\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Start with Java");\n\t}\n}\n`,
    csharp:
      'using System;\n\nnamespace Main\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Start with C#");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$run = 'Start with PHP';\necho $run;\n",   
  };