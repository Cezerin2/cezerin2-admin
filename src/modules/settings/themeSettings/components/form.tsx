import React, { useEffect } from "react"
import { reduxForm } from "redux-form"

import messages from "../../../../lib/text"
import sortBy from "lodash/sortBy"

import Paper from "material-ui/Paper"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import DynamicEditControl from "./dynamicEditControl"
import "./style.sass"

const ThemeSettings = props => {
  useEffect(() => props.onLoad(), [])

  const {
    handleSubmit,
    pristine,
    submitting,
    initialValues,
    reset,
    settingsSchema,
  } = props
  if (initialValues && settingsSchema) {
    let lastSection = null
    const sortedSettingsSchema = sortBy(settingsSchema, ["section", "label"])

    const fields = sortedSettingsSchema.map((item, index) => {
      let sectionTitle = null
      if (item.section !== lastSection) {
        lastSection = item.section
        sectionTitle =
          item.section && item.section !== "" ? (
            <div className="sectionTitle">{item.section}</div>
          ) : null
      }

      return (
        <div key={index}>
          {sectionTitle}
          <DynamicEditControl
            type={item.type}
            fieldName={item.key}
            label={item.label}
            options={item.options}
            properties={item.properties}
          />
        </div>
      )
    })

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "initial",
          width: "100%",
        }}
      >
        <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
          {messages.themeSettings}
        </div>
        <Paper className="paper-box" zDepth={1}>
          <div className="innerBox">{fields}</div>
          <div className="buttons-box">
            <FlatButton
              label={messages.cancel}
              className="button"
              onClick={reset}
              disabled={pristine || submitting}
            />
            <RaisedButton
              type="submit"
              label={messages.save}
              primary
              className="button"
              disabled={pristine || submitting}
            />
          </div>
        </Paper>
      </form>
    )
  }
  return null
}

export default reduxForm({
  form: "ThemeSettingsForm",
  enableReinitialize: true,
})(ThemeSettings)
