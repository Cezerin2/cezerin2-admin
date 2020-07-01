import { connect } from "react-redux"
import { fetchThemeSettings, updateThemeSettings } from "../actions"
import Form from "./components/form"

const mapStateToProps = state => ({
  initialValues: state.settings.themeSettings,
  settingsSchema: state.settings.themeSettingsSchema,
})

const mapDispatchToProps = (dispatch: Function) => ({
  onLoad: () => {
    dispatch(fetchThemeSettings())
  },
  onSubmit: (values: string) => {
    dispatch(updateThemeSettings(values))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
