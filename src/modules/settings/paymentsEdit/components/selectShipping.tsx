import Checkbox from "material-ui/Checkbox"
import { List, ListItem } from "material-ui/List"
import React, { useEffect, useState } from "react"

const SelectShippingMethodsField =(props:Readonly<>) =>{\
    const ids = Array.isArray(props.input.value) ? props.input.value : []
     const [selectedIds,setSelectedIds] =useState(ids)

  useEffect(() =>{
    const newIds = Array.isArray(props.input.value)
      ? props.input.value
      : []
    if (newIds !== selectedIds) {
      setSelectedIds(newIds)
    }
  },[props.input])

  const  onCheckboxChecked = methodId => {
    let ids = selectedIds
    if (ids.includes(methodId)) {
      ids = ids.filter(id => id !== methodId)
    } else {
      ids.push(methodId)
    }
  setSelectedIds(ids)
    props.input.onChange(ids)
  }

  const isCheckboxChecked = methodId => selectedIds.includes(methodId)

    const items = props.shippingMethods.map(method => (
      <ListItem
        key={method.id}
        leftCheckbox={
          <Checkbox
            checked={isCheckboxChecked(method.id)}
            onCheck={() => {
              onCheckboxChecked(method.id)
            }}
          />
        }
        primaryText={method.name}
        secondaryText={method.description}
      />
    ))

    return <List>{items}</List>
  }

  export default SelectShippingMethodsField