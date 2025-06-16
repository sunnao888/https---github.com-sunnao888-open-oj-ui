"use client"

import { useState } from "react"
import MonacoCodeEditor, { type SupportedLanguage } from "./monaco-code-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const languageOptions: { value: SupportedLanguage; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python 3" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
]

const defaultCodes: Record<SupportedLanguage, string> = {
  javascript: `// JavaScript 示例代码
function hello(name) {
  console.log('Hello, ' + name + '!');
  return name.length;
}

// 调用函数
const result = hello('World');
console.log('结果:', result);`,
  
  python: `# Python 示例代码
def hello(name):
    print(f'Hello, {name}!')
    return len(name)

# 调用函数
result = hello('World')
print('结果:', result)`,
  
  java: `// Java 示例代码
public class Main {
    public static void main(String[] args) {
        String name = "World";
        int result = hello(name);
        System.out.println("结果: " + result);
    }
    
    public static int hello(String name) {
        System.out.println("Hello, " + name + "!");
        return name.length();
    }
}`,
  
  c: `// C 示例代码
#include <stdio.h>
#include <string.h>

int hello(char* name) {
    printf("Hello, %s!\\n", name);
    return strlen(name);
}

int main() {
    char name[] = "World";
    int result = hello(name);
    printf("结果: %d\\n", result);
    return 0;
}`,
  
  cpp: `// C++ 示例代码
#include <iostream>
#include <string>

int hello(const std::string& name) {
    std::cout << "Hello, " << name << "!" << std::endl;
    return name.length();
}

int main() {
    std::string name = "World";
    int result = hello(name);
    std::cout << "结果: " << result << std::endl;
    return 0;
}`,
  
  go: `// Go 示例代码
package main

import "fmt"

func hello(name string) int {
    fmt.Printf("Hello, %s!\\n", name)
    return len(name)
}

func main() {
    name := "World"
    result := hello(name)
    fmt.Printf("结果: %d\\n", result)
}`
}

export default function MonacoDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("javascript")
  const [code, setCode] = useState(defaultCodes.javascript)

  const handleLanguageChange = (langValue: string) => {
    const lang = langValue as SupportedLanguage
    setSelectedLanguage(lang)
    setCode(defaultCodes[lang])
  }

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }

  const handleRunCode = () => {
    console.log("运行代码:", code)
    alert("代码已输出到控制台")
  }

  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">Monaco Editor 演示</h3>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择语言" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleRunCode} variant="outline">
            运行代码
          </Button>
        </div>
      </div>
      
      <div className="h-[calc(600px-80px)]">
        <MonacoCodeEditor
          initialCode={code}
          language={selectedLanguage}
          onCodeChange={handleCodeChange}
          theme="vs-dark"
        />
      </div>
    </div>
  )
} 