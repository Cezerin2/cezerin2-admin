import { Button, Dialog } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { reduxForm } from "redux-form"
import messages from "../../../../lib/text"
import { AVAILABLE_PAYMENT_GATEWAYS } from "../availablePaymentGateways"
import GatewaySettings from "./gatewaySettings.js"
import style from "./style.css"

const EditPaymentGatewayForm = (
  props: Readonly<{ handleSubmit; pristine; submitting; onLoad; gateway }>
) => {
  const [open, setOpen] = useState(false)

  const { handleSubmit, pristine, submitting, onLoad, gateway } = props

  useEffect(() => {
    onLoad()
  }, [])

  useEffect(() => {
    onLoad(gateway)
  }, [gateway])

  const gatewayDetails = AVAILABLE_PAYMENT_GATEWAYS.find(
    item => item.key === gateway
  )

  if (gateway && gateway.length > 0) {
    return (
      <>
        <Button
          onClick={() => setOpen(true)}
          style={{ margin: "15px 0 30px 0" }}
        >
          {messages.drawer_settings}
        </Button>

        <Dialog
          title={gatewayDetails.name}
          modal={false}
          open={open}
          autoScrollBodyContent
          contentStyle={{ width: 600 }}
          onRequestClose={() => setOpen(false)}
        >
          <div style={{ width: "500px", margin: "25px" }}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "initial", width: "100%" }}
            >
              <GatewaySettings gateway={gateway} />

              <div className={style.buttons}>
                <Button onClick={() => setOpen(false)}>
                  {messages.cancel}
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  onClick={() => setOpen(false)}
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
