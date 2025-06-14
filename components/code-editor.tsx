"use client"

import { useState, useEffect } from "react"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-go"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
// Ensure your prism theme is imported, e.g., in globals.css or here
// import 'prismjs/themes/prism-tomorrow.css';

export type SupportedLanguage = "javascript" | "python" | "java" | "c" | "cpp" | "go"

interface CodeEditorProps {
  initialCode?: string
  language?: SupportedLanguage
  onCodeChange?: (code: string) => void
  readOnly?: boolean
}

export default function CodeEditor({
  initialCode = "",
  language = "javascript",
  onCodeChange,
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode, language]) // Also update if language changes initialCode

  const handleValueChange = (newCode: string) => {
    setCode(newCode)
    if (onCodeChange) {
      onCodeChange(newCode)
    }
  }

  const highlightCode = (codeToHighlight: string) => {
    const langDefinition = Prism.languages[language] || Prism.languages.clike // Fallback to clike
    if (!langDefinition) {
      return codeToHighlight // Return plain code if language definition not found
    }
    return Prism.highlight(codeToHighlight, langDefinition, language)
  }

  return (
    <div className="relative rounded-md border bg-[#2d2d2d] p-1 h-full">
      <Editor
        value={code}
        onValueChange={handleValueChange}
        highlight={highlightCode}
        padding={16}
        readOnly={readOnly}
        className="font-mono text-sm outline-none focus:ring-2 focus:ring-primary rounded-md h-full overflow-auto"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          backgroundColor: "#2d2d2d",
          color: "#ccc",
        }}
        textareaClassName="focus:outline-none"
        preClassName="focus:outline-none"
      />
    </div>
  )
}
