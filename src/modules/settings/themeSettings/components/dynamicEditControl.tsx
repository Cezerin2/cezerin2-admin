import React from "react"
import { Field, FieldArray } from "redux-form"
import { TextField, SelectField } from "redux-form-material-ui"

import {
  CustomToggle,
  NumberField,
  ColorField,
} from "../../../../modules/shared/form"
import MenuItem from "material-ui/MenuItem"
import "./style.sass"
import ArrayEditor from "./arrayEditor"
import ImageEditor from "./imageEditor"

const DynamicEditControl = ({
  type,
  fieldName,
  label,
  options,
  properties,
}) => {
  const hasOptions = options && Array.isArray(options) && options.length > 0
  const hasProperties =
    properties && Array.isArray(properties) && properties.length > 0

  if (type === "string" && !hasOptions) {
    return (
      <Field
        component={TextField}
        fullWidth
        name={fieldName}
        floatingLabelText={label}
      />
    )
  }
  if (type === "string" && hasOptions) {
    const selectOptions = options.map((option, index) => (
      <MenuItem key={index} value={option.value} primaryText={option.label} />
    ))
    return (
      <Field
        component={SelectField}
        name={fieldName}
        floatingLabelText={label}
        fullWidth
        autoWidth
      >
        {selectOptions}
      </Field>
    )
  }
  if (type === "number") {
    return <Field component={NumberField} name={fieldName} label={label} />
  }
  if (type === "color") {
    return (
      <div className="colorInput">
        <label>{label}</label>
        <Field component={ColorField} name={fieldName} />
      </div>
    )
  }
  if (type === "boolean") {
    return (
      <Field
        component={CustomToggle}
        name={fieldName}
        label={label}
        style={{ paddingTop: 16, paddingBottom: 16 }}
      />
    )
  }
  if (type === "array" && hasProperties) {
    return (
      <FieldArray
        name={fieldName}
        component={ArrayEditor}
        label={label}
        properties={properties}
      />
    )
  }
  if (type === "image") {
    return <Field name={fieldName} component={ImageEditor} label={label} />
  }
  return null
}

export default DynamicEditControl
