import React from "react"
import EditorJS from "@editorjs/editorjs"

import Routes from "./routes/index"

import {
  blue700,
  cyan700,
  pinkA200,
  grey100,
  grey300,
  grey400,
  white,
  darkBlack,
  fullBlack,
} from "material-ui/styles/colors"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"

import "./App.css"

const muiTheme = getMuiTheme({
  fontFamily: "Roboto, sans-serif",
  palette: {
    primary1Color: blue700,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: blue700,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: blue700,
    shadowColor: fullBlack,
  },
  appBar: {},
})
const editor = new EditorJS()
function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  )
}

export default App
