export const LANGUAGE_VERSION = { 
    "Python": "3.13.0",
    "JavaScript": "18.15.0",
    "Java": "21.0.2",
    "C": "17", 
    "C++": "23",
    "C#": "12.0",
    "PHP": "8.3.0"
};

export const CODE_SNIPPETS = {
    Python: `def greet(name):
    print("Hello, " + name + "!")
    
greet("Alex")`,

    C: `#include <stdio.h>

void greet(char name[]) {
    printf("Hello, %s!\\n", name);
}

int main() {
    greet("Alex");
    return 0;
}`,

    "C++": `#include <iostream>
using namespace std;

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    greet("Alex");
    return 0;
}`,

    JavaScript: `function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("Alex");`,

    Java: `public class Greet {
    public static void main(String[] args) {
        System.out.println("Hello, Alex!");
    }
}`,

    "C#": `using System;

namespace HelloWorld
{
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello, Alex!");
        }
    }
}`,

    PHP: `<?php
$name = "Alex";
echo "Hello, " . $name . "!";
?>`
};
