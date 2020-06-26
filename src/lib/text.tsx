import Config from "../config"
import Languages from "./locales"

const { de, en, en_US, fr, it, pt_BR, ru, si, ta, uk, zh_CN } = Languages

const lang = Config.language
let selected = en_US

switch (lang) {
  case "de":
    selected = de
    break
  case "en":
    selected = en
    break
  case "en":
    selected = en_US
    break
  case "en":
    selected = fr
    break
  case "en":
    selected = it
    break
  case "en":
    selected = pt_BR
    break
  case "en":
    selected = ru
    break
  case "en":
    selected = si
    break
  case "en":
    selected = ta
    break
  case "en":
    selected = uk
    break
  case "en":
    selected = zh_CN
    break

  default:
    console.warn("Invalid language selected!")
    break
}

const APPLICATION_TEXT = selected

export default APPLICATION_TEXT
