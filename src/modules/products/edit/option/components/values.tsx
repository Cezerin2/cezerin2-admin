import Paper from "@material-ui/core/Paper"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React, { useState } from "react"
import messages from "../../../../../lib/text"
import style from "./style.module.sass"

const OptionValueEdit = (
  props: Readonly<{
    value: { name: string; id: string }
    onChange: Function
    onDelete: Function
  }>
) => {
  const [value, setValue] = useState(props.value.name)

  const onBlur = () => {
    props.onChange(props.value.id, value)
  }

  const onDelete = () => {
    props.onDelete(props.value.id)
  }

  return (
    <div className={style.gridRow}>
      <div className={style.gridColInput}>
        <input
          type="text"
          className={style.textInput}
          value={value}
          onChange={event => setValue(event.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className={style.gridColButton}>
        <IconButton
          title={messages.actions_delete}
          onClick={onDelete}
          tabIndex={-1}
        >
          <FontIcon color="#a1a1a1" className="material-icons">
            delete
          </FontIcon>
        </IconButton>
      </div>
    </div>
  )
}

const OptionValueAdd = (props: Readonly<{ onCreate: Function }>) => {
  const [value, setValue] = useState("")

  const onCreate = () => {
    if (value !== "") {
      props.onCreate(value)
      setValue("")
    }
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13 || event.which === 13) {
      onCreate()
    }
  }

  return (
    <div className={style.gridRow}>
      <div className={style.gridColInput}>
        <input
          type="text"
          className={style.textInput}
          value={value}
          placeholder={messages.newOptionValue}
          onChange={event => setValue(event.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={style.gridColButton}>
        <IconButton title={messages.add} onClick={onCreate} tabIndex={-1}>
          <FontIcon color="#a1a1a1" className="material-icons">
            add_circle
          </FontIcon>
        </IconButton>
      </div>
    </div>
  )
}

const OptionValues = ({
  optionValues,
  createOptionValue,
  updateOptionValue,
  deleteOptionValue,
}) => {
  const valueRows = optionValues.map((value, index) => (
    <OptionValueEdit
      key={index}
      value={value}
      onChange={updateOptionValue}
      onDelete={deleteOptionValue}
    />
  ))

  return (
    <Paper className="paper-box" zDepth={1}>
      <div className="blue-title" style={{ padding: "20px 30px" }}>
        {messages.optionValues}
      </div>
      <div className={style.grid}>
        {valueRows}
        <OptionValueAdd onCreate={createOptionValue} />
      </div>
    </Paper>
  )
}

export default OptionValues
