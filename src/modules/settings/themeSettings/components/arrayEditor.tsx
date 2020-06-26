import Paper from "@material-ui/core/Paper"
import FlatButton from "material-ui/FlatButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import FontIcon from "material-ui/FontIcon"
import React from "react"
import messages from "../../../../lib/text"
import DynamicEditControl from "./dynamicEditControl"
import style from "./style.module.sass"

const ArrayEditor = ({ label, properties, fields }) => (
  <>
    <div className={style.arrayTitle}>
      {label}
      <FloatingActionButton
        mini
        secondary
        onClick={() => fields.push({})}
        style={{ marginLeft: "20px" }}
      >
        <FontIcon className="material-icons">add</FontIcon>
      </FloatingActionButton>
    </div>

    <ol style={{ listStyle: "none" }}>
      {fields.map((field, index) => (
        <li key={index}>
          <Paper
            style={{ margin: "20px 0 20px 20px", backgroundColor: "#f7f7f7" }}
            elevation={1}
          >
            <div className={style.arrayItemHead}>
              <FlatButton
                label={messages.actions_delete}
                secondary
                onClick={() => fields.remove(index)}
              />

              {index > 0 && (
                <FlatButton
                  label={messages.actions_moveUp}
                  onClick={() => fields.move(index, index - 1)}
                />
              )}

              {index + 1 < fields.length && (
                <FlatButton
                  label={messages.actions_moveDown}
                  onClick={() => fields.move(index, index + 1)}
                />
              )}
            </div>

            <div className={style.arrayInnerBox}>
              {properties.map((property, propertyIndex) => {
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
