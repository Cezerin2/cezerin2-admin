import { Button, MenuItem, Select, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import api from "../../../../lib/api"
import messages from "../../../../lib/text"
import style from "./style.module.sass"

const validate = (values: any) => {
  const errors = {}
  const requiredFields = ["email", "full_name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const CustomerEditForm = (props: any) => {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const json = api.customerGroups.list()
    try {
      setGroups(json)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const { handleSubmit, pristine, submitting, onCancel } = props

  const groupItems = groups.map((item, index) => (
    <MenuItem key={index} value={item.id} primaryText={item.name} />
  ))
  groupItems.push(
    <MenuItem
      key="none"
      value={null}
      primaryText={messages.customers_noGroup}
    />
  )

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <>
        <Field
          component={TextField}
          fullWidth
          name="full_name"
          floatingLabelText={messages.fullName}
        />
        <Field
          component={Select}
          fullWidth
          name="group_id"
          floatingLabelText={messages.group}
        >
          {groupItems}
        </Field>
        <Field
          component={TextField}
          fullWidth
          name="email"
          floatingLabelText={messages.email}
        />
        <Field
          component={TextField}
          fullWidth
          name="mobile"
          floatingLabelText={messages.mobile}
        />
        <Field
          component={TextField}
          fullWidth
          name="note"
          floatingLabelText={messages.note}
          multiLine
        />
      </>
      <div className={style.shippingButtons}>
        <Button label={messages.cancel} onClick={onCancel}></Button>
        <Button
          color="primary"
          type="submit"
          style={{ marginLeft: 12 }}
          disabled={pristine || submitting}
        >
          {messages.save}
        </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: "CustomerEditForm",
  validate,
  enableReinitialize: true,
})(CustomerEditForm)
