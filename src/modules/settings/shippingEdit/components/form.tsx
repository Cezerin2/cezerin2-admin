import { Button, Divider, Paper, TextField } from "@material-ui/core"
import React, { useEffect } from "react"
import { Field, FieldArray, reduxForm } from "redux-form"
import messages from "../../../../lib/text"
import { CustomToggle } from "../../../../modules/shared/form"
import FieldsEditor from "./fieldsEditor"
import style from "./style.module.sass"

const validate = values => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const EditShippingMethodForm = (props: Readonly<{}>) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    methodId,
    settings,
    onLoad,
  } = props

  useEffect(() => {
    onLoad()
  }, [])

  const isAdd = methodId === null || methodId === undefined

  return (
    <form onSubmit={handleSubmit}>
      <Paper className="paper-box" zDepth={1}>
        <div className={style.innerBox}>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="blue-title">{messages.description}</div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <>
                <Field
                  component={TextField}
                  fullWidth
                  name="name"
                  floatingLabelText={messages.settings_shippingMethodName}
                />
                <Field
                  component={TextField}
                  fullWidth
                  name="description"
                  multiLine
                  floatingLabelText={messages.description}
                />
              </>

              <div className="row">
                <div className="col-xs-6">
                  <Field
                    component={TextField}
                    name="price"
                    type="number"
                    fullWidth
                    floatingLabelText={`${messages.settings_shippingRate} (${settings.currency_symbol})`}
                  />
                </div>
                <div className="col-xs-6">
                  <Field
                    component={CustomToggle}
                    name="enabled"
                    label={messages.enabled}
                    style={{ paddingTop: 16, paddingBottom: 20 }}
                  />
                  <Divider />
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-xs-12 col-sm-4">
              <div className="blue-title">{messages.settings_conditions}</div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <>
                <Field
                  component={TextField}
                  fullWidth
                  name="conditions.countries"
                  floatingLabelText={messages.settings_countries}
                  hintText="US,UK,AU,SG"
                />
                <Field
                  component={TextField}
                  fullWidth
                  name="conditions.states"
                  floatingLabelText={messages.settings_states}
                  hintText="California,Nevada,Oregon"
                />
                <Field
                  component={TextField}
                  fullWidth
                  name="conditions.cities"
                  floatingLabelText={messages.settings_cities}
                  hintText="Los Angeles,San Diego,San Jose"
                />
              </>

              <div className="row">
                <div className="col-xs-6">
                  <Field
                    component={TextField}
                    name="conditions.weight_total_min"
                    type="number"
                    fullWidth
                    floatingLabelText={`${messages.settings_minTotalWeight} (${settings.weight_unit})`}
                  />
                </div>
                <div className="col-xs-6">
                  <Field
                    component={TextField}
                    name="conditions.weight_total_max"
                    type="number"
                    fullWidth
                    floatingLabelText={`${messages.settings_maxTotalWeight} (${settings.weight_unit})`}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                  <Field
                    component={TextField}
                    name="conditions.subtotal_min"
                    type="number"
                    fullWidth
                    floatingLabelText={`${messages.settings_minSubtotal} (${settings.currency_symbol})`}
                  />
                </div>
                <div className="col-xs-6">
                  <Field
                    component={TextField}
                    name="conditions.subtotal_max"
                    type="number"
                    fullWidth
                    floatingLabelText={`${messages.settings_maxSubtotal} (${settings.currency_symbol})`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-xs-12 col-sm-4">
              <div className="blue-title">
                {messages.settings_checkoutFields}
              </div>
              <div className="field-hint">
                Standard:
                <ul>
                  <li>full_name</li>
                  <li>address1</li>
                  <li>address2</li>
                  <li>postal_code</li>
                  <li>phone</li>
                  <li>company</li>
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <FieldArray name="fields" component={FieldsEditor} />
            </div>
          </div>
        </div>
        <div className="buttons-box">
          <Button
            type="submit"
            color="primary"
            className={style.button}
            disabled={pristine || submitting}
          >
            {isAdd ? messages.add : messages.save}
          </Button>
        </div>
      </Paper>
    </form>
  )
}

export default reduxForm({
  form: "EditShippingMethodForm",
  validate,
  enableReinitialize: true,
})(EditShippingMethodForm)
