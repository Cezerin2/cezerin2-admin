import {
  Button,
  IconButton,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import IconMenu from "material-ui/IconMenu"
import React from "react"
import { Field } from "redux-form"
import messages from "../../../../lib/text"
import { CustomToggle } from "../../../../modules/shared/form"

const FieldsEditor = ({ fields }: { fields: any }) => (
  <>
    {fields.map((field: string, index: number) => {
      const fieldKey = `${field}.key`
      const fieldLabel = `${field}.label`
      const fieldRequired = `${field}.required`

      return (
        <Paper
          className="paper-box"
          elevation={1}
          key={index}
          style={{
            padding: "0px 20px",
            margin: "10px 0px",
            backgroundColor: "#f7f7f7",
          }}
        >
          <div className="row middle-xs center-xs">
            <div className="col-xs-4">
              <Field
                component={TextField}
                name={fieldKey}
                floatingLabelText={messages.fieldKey}
                fullWidth
                required
                pattern="^[A-Za-z0-9_]{2,32}$"
              />
            </div>
            <div className="col-xs-4">
              <Field
                component={TextField}
                name={fieldLabel}
                floatingLabelText={messages.settings_fieldLabel}
                fullWidth
              />
            </div>
            <div className="col-xs-3">
              <Field
                component={CustomToggle}
                name={fieldRequired}
                label={messages.settings_fieldRequired}
                style={{ paddingTop: 16, paddingBottom: 16 }}
              />
            </div>
            <div className="col-xs-1">
              <IconMenu
                targetOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                iconButtonElement={
                  <IconButton>
                    <MoreVert color="primary" className="material-icons" />
                  </IconButton>
                }
              >
                <MenuItem onClick={() => fields.remove(index)}>
                  {messages.actions_delete}
                </MenuItem>
                {index > 0 && (
                  <MenuItem onClick={() => fields.move(index, index - 1)}>
                    {messages.actions_moveUp}
                  </MenuItem>
                )}
                {index + 1 < fields.length && (
                  <MenuItem onClick={() => fields.move(index, index + 1)}>
                    {messages.actions_moveDown}
                  </MenuItem>
                )}
              </IconMenu>
            </div>
          </div>
        </Paper>
      )
    })}

    <Button onClick={() => fields.push({})} style={{ margin: "20px 0px" }}>
      {messages.add}
    </Button>
  </>
)

export default FieldsEditor
