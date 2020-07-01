import { connect } from "react-redux"
import { fetchSettings, updateSettings } from "../actions"
import Form from "./components/form"

const mapStateToProps = (state: { settings: { settings: string } }) => ({
  initialValues: state.settings.settings,
})

const mapDispatchToProps = (dispatch: Function) => ({
  onLoad: () => {
    dispatch(fetchSettings())
  },
  onSubmit: (values: string) => {
    dispatch(updateSettings(values))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
