"use client"

import { useState, useEffect } from "react"
import Editor from "@monaco-editor/react"

export type SupportedLanguage = "javascript" | "python" | "java" | "c" | "cpp" | "go"

interface MonacoCodeEditorProps {
  initialCode?: string
  language?: SupportedLanguage
  onCodeChange?: (code: string) => void
  readOnly?: boolean
  theme?: "vs-dark" | "light"
  height?: string | number
}

export default function MonacoCodeEditor({
  initialCode = "",
  language = "javascript",
  onCodeChange,
  readOnly = false,
  theme = "vs-dark",
  height = "100%",
}: MonacoCodeEditorProps) {
  const [code, setCode] = useState(initialCode)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode, language])

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || ""
    setCode(newCode)
    if (onCodeChange) {
      onCodeChange(newCode)
    }
  }

  const handleEditorDidMount = (editor: any, monaco: any) => {
    // 编辑器挂载后的配置
    editor.focus()
    
    // 自定义主题（可选）
    monaco.editor.defineTheme('oj-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
      }
    })

    // 设置编辑器选项
    editor.updateOptions({
      fontSize: 14,
      fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
      lineHeight: 1.5,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      detectIndentation: false,
      renderWhitespace: 'boundary',
      renderControlCharacters: true,
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true,
      },
    })
  }

  const handleEditorWillMount = (monaco: any) => {
    // 在编辑器挂载前的配置
    // 可以在这里注册自定义语言、主题等
  }

  return (
    <div className="w-full h-full">
      <Editor
        height={height}
        language={language}
        value={code}
        theme={theme === "vs-dark" ? "vs-dark" : "light"}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        loading={<div className="flex items-center justify-center h-full text-muted-foreground">加载编辑器中...</div>}
        options={{
          readOnly,
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line',
          automaticLayout: true,
          scrollbar: {
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            vertical: 'visible',
            horizontal: 'visible',
          },
        }}
      />
    </div>
  )
} 