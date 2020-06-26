import { Button, MenuItem, Paper, Select, TextField } from "@material-ui/core"
import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../../lib/text"
import { CustomToggle } from "../../../../../modules/shared/form"
import style from "./style.module.sass"
import OptionValues from "./values"

const validate = (values: any) => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const ProductOptionForm = (
  props: Readonly<{
    fetchData: Function
    handleSubmit: string
    pristine: string
    reset: string
    submitting: string
    deleteOption: string
    optionValues: string
    createOptionValue: string
    updateOptionValue: string
    deleteOptionValue: string
  }>
) => {
  useEffect(() => {
    props.fetchData()
  }, [])

  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    deleteOption,
    optionValues,
    createOptionValue,
    updateOptionValue,
    deleteOptionValue,
  } = props

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className="paper-box" zDepth={1}>
          <div className={style.innerBox}>
            <Field
              name="name"
              component={TextField}
              floatingLabelText={messages.optionName}
              fullWidth
            />
            <div className="row">
              <div className="col-xs-6">
                <Field
                  name="position"
                  component={TextField}
                  type="number"
                  floatingLabelText={messages.position}
                  fullWidth
                />
              </div>
              <div className="col-xs-6">
                <Field
                  component={Select}
                  autoWidth
                  fullWidth
                  name="control"
                  floatingLabelText={messages.optionControl}
                >
                  <MenuItem
                    value="select"
                    primaryText={messages.optionControlSelect}
                  />
                </Field>
              </div>
            </div>
            <div className={style.shortControl}>
              <Field
                name="required"
                component={CustomToggle}
                label={messages.settings_fieldRequired}
              />
            </div>
          </div>
          <div className="buttons-box">
            <Button color="secondary" onClick={deleteOption}>
              {messages.actions_delete}
            </Button>
            <Button
              style={{ marginLeft: 12 }}
              onClick={reset}
              disabled={pristine || submitting}
            >
              {messages.cancel}
            </Button>
            <Button
              type="submit"
              color="primary"
              className={style.button}
              disabled={pristine || submitting}
            >
              {messages.save}
            </Button>
          </div>
        </Paper>
      </form>
      <OptionValues
        optionValues={optionValues}
        createOptionValue={createOptionValue}
        updateOptionValue={updateOptionValue}
        deleteOptionValue={deleteOptionValue}
      />
    </>
  )
}

export default reduxForm({
  form: "ProductOptionForm",
  validate,
  enableReinitialize: true,
})(ProductOptionForm)
