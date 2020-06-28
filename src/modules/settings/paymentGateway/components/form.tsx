import { Button, Dialog } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { reduxForm } from "redux-form"
import messages from "../../../../lib/text"
import { AVAILABLE_PAYMENT_GATEWAYS } from "../availablePaymentGateways"
import GatewaySettings from "./gatewaySettings"
import style from "./style.module.sass"

const EditPaymentGatewayForm = (props: Readonly<{}>) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    onLoad()
  }, [])

  useEffect(() => {
    onLoad(props.gateway)
  }, [props.gateway])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { handleSubmit, pristine, submitting, initialValues, onLoad } = props
  const gatewayDetails = AVAILABLE_PAYMENT_GATEWAYS.find(
    item => item.key === props.gateway
  )

  if (props.gateway && props.gateway.length > 0) {
    return (
      <>
        <Button onClick={handleOpen} style={{ margin: "15px 0 30px 0" }}>
          {messages.drawer_settings}
        </Button>

        <Dialog
          title={gatewayDetails.name}
          modal={false}
          open={open}
          autoScrollBodyContent
          contentStyle={{ width: 600 }}
          onRequestClose={handleClose}
        >
          <div style={{ width: "500px", margin: "25px" }}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "initial", width: "100%" }}
            >
              <GatewaySettings gateway={props.gateway} />

              <div className={style.buttons}>
                <Button onClick={handleClose}>{messages.cancel}</Button>
                <Button
                  color="primary"
                  type="submit"
                  onClick={handleClose}
                  style={{ marginLeft: 12 }}
                  disabled={pristine || submitting}
                >
                  {messages.save}
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      </>
    )
  }
  return null
}

export default reduxForm({
  form: "EditPaymentGatewayForm",
  enableReinitialize: true,
})(EditPaymentGatewayForm)
