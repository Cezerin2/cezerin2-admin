import { Checkbox, Divider, ListItem } from "@material-ui/core"
import { Place } from "@material-ui/icons"
import { Link } from "@reach/router"
import React from "react"
import * as helper from "../../../../lib/helper"
import style from "./style.module.sass"

const CustomersListItem = ({ customer, onSelect, selected, settings }) => {
  const checked = selected.includes(customer.id)
  const totalSpentFormatted = helper.formatCurrency(
    customer.total_spent,
    settings
  )

  return (
    <div className={`customers-item${checked === true ? " selected" : ""}`}>
      <ListItem
        style={{ cursor: "normal" }}
        primaryText={
          <div className="row middle-xs">
            <div className="col-xs-1">
              <Checkbox
                checked={checked}
                onCheck={(event, isInputChecked) => {
                  onSelect(customer.id, isInputChecked)
                }}
              />
            </div>
            <div className="col-xs-5">
              <Link
                to={`/customer/${customer.id}`}
                className={style.customerName}
              >
                {customer.full_name}
                <br />
                <small>{customer.group_name}</small>
              </Link>
            </div>
            <div className={`col-xs-3 ${style.location}`}>
              {customer.shipping && customer.shipping.city && (
                <span>
                  <Place
                    style={{
                      color: "rgba(0, 0, 0, 0.4)",
                      fontSize: 16,
                      marginRight: 6,
                    }}
                    className="material-icons"
                  />
                  {customer.shipping.city}
                </span>
              )}
            </div>
            <div className="col-xs-1">{customer.orders_count || 0}</div>
            <div className="col-xs-2">
              <div className={style.price}>{totalSpentFormatted}</div>
            </div>
          </div>
        }
      />
      <Divider />
    </div>
  )
}

export default CustomersListItem
