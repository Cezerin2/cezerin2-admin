import { Checkbox, List, ListItem, TextField } from "@material-ui/core"
import Toggle from "material-ui/Toggle"
import React, { useEffect, useState } from "react"

export const CustomToggle = ({
  input,
  label,
  className = "",
  disabled = false,
  style,
}) => (
  <Toggle
    label={label}
    toggled={!!input.value}
    onToggle={(event, isInputChecked) => {
      input.onChange(isInputChecked)
    }}
    className={className}
    disabled={disabled}
    style={style}
  />
)

export const NumberField = ({
  input,
  label,
  className = "",
  disabled = false,
  style,
}) => (
  <TextField
    floatingLabelText={label}
    fullWidth
    disabled={disabled}
    value={input.value}
    type="number"
    onChange={(event, value) => {
      let number = parseFloat(value)
      number = number || 0
      input.onChange(number)
    }}
  />
)

export const ColorField = ({ input, meta: { touched, error } }) => (
  <input {...input} type="color" />
)

export const MultiSelect = (
  props: Readonly<{
    input: { value: {} }
    items: string
    disabled: string
    columns: number
  }>
) => {
  const values = Array.isArray(props.input.value) ? props.input.value : []

  const [selectedItems, setSelectedItems] = useState(values)

  //componentWillReceiveProps(nextProps) {
  useEffect(nextProps => {
    const values = Array.isArray(nextProps.input.value)
      ? nextProps.input.value
      : []
    if (values !== selectedItems) {
      setSelectedItems(values)
    }
  }, [])

  const onCheckboxChecked = (item: string) => {
    let newSelectedItems = []
    if (selectedItems.includes(item)) {
      newSelectedItems = selectedItems.filter(i => i !== item)
    } else {
      newSelectedItems = [...selectedItems, item]
    }
    newSelectedItems.sort()
    setSelectedItems(newSelectedItems)
    props.input.onChange(newSelectedItems)
  }

  const isCheckboxChecked = (item: string) => selectedItems.includes(item)

  const { items, disabled, columns = 2 } = props
  const columnsClass = 12 / columns

  const elements = items.map((item, index) => (
    <div className={`col-xs-12 col-sm-${columnsClass}`} key={index}>
      {item && item !== "" && (
        <ListItem
          leftCheckbox={
            <Checkbox
              checked={isCheckboxChecked(item)}
              disabled={disabled}
              onCheck={(e, isChecked) => {
                onCheckboxChecked(item)
              }}
            />
          }
          primaryText={item}
        />
      )}
    </div>
  ))

  return (
    <List>
      <div className="row">{elements}</div>
    </List>
  )
}
