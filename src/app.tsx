import React from "react"
import EditorJS from "@editorjs/editorjs"

import Routes from "./routes/index"

import "./App.css"

const editor = new EditorJS()
function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  )
}

export default App
