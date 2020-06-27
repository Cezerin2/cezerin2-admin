import { Divider, List, ListItem, Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import { Link } from "@reach/router"
import React, { useEffect } from "react"

const MethodItem = ({ method }: { method }) => (
  <>
    <Divider />
    <Link
      to={`/settings/payments/${method.id}`}
      style={{ textDecoration: "none" }}
    >
      <ListItem
        rightIcon={<KeyboardArrowRight className="material-icons" />}
        style={!method.enabled ? { color: "rgba(0, 0, 0, 0.3)" } : {}}
        primaryText={
          <div className="row">
            <div className="col-xs-6">{method.name}</div>
            <div className="col-xs-6" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
              {method.description}
            </div>
          </div>
        }
      />
    </Link>
  </>
)

const EmailSettings = (props: Readonly<{}>) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { paymentMethods } = props
  const methods = paymentMethods.map((method, index) => (
    <MethodItem key={index} method={method} />
  ))

  return (
    <Paper className="paper-box" elevation={1}>
      <div style={{ width: "100%" }}>
        <List style={{ padding: 0 }}>{methods}</List>
      </div>
    </Paper>
  )
}

export default EmailSettings
