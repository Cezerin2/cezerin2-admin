import { Button, Paper } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import React from "react"
import messages from "../../../../lib/text"
import DynamicEditControl from "./dynamicEditControl"
import style from "./style.module.sass"

const ArrayEditor = ({
  label,
  properties,
  fields,
}: {
  label: string
  properties: any
  fields: any
}) => (
  <>
    <div className={style.arrayTitle}>
      {label}
      <Button
        size="small"
        color="secondary"
        onClick={() => fields.push({})}
        style={{ marginLeft: "20px" }}
      >
        <Add className="material-icons" />
      </Button>
    </div>

    <ol style={{ listStyle: "none" }}>
      {fields.map((field: string, index: number) => (
        <li key={index}>
          <Paper
            style={{ margin: "20px 0 20px 20px", backgroundColor: "#f7f7f7" }}
            elevation={1}
          >
            <div className={style.arrayItemHead}>
              <Button color="secondary" onClick={() => fields.remove(index)}>
                {messages.actions_delete}
              </Button>

              {index > 0 && (
                <Button onClick={() => fields.move(index, index - 1)}>
                  {messages.actions_moveUp}
                </Button>
              )}

              {index + 1 < fields.length && (
                <Button onClick={() => fields.move(index, index + 1)}>
                  {messages.actions_moveDown}
                </Button>
              )}
            </div>

            <div className={style.arrayInnerBox}>
              {properties.map((property: any, propertyIndex: string) => {
                const fieldName = `${field}.${property.key}`
                return (
                  <DynamicEditControl
                    key={propertyIndex}
                    type={property.type}
                    fieldName={fieldName}
                    label={property.label}
                    options={property.options}
                    properties={property.properties}
                  />
                )
              })}
            </div>
          </Paper>
        </li>
      ))}
    </ol>
  </>
)

export default ArrayEditor
