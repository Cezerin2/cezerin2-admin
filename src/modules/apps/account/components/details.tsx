import React, { useEffect } from "react"
import Account from "./account"
import Developer from "./developer"
import "./style.sass"

const WebStoreAccountDetails = props => {
  useEffect(() => props.fetchData(), [])

  const { account, onAccountSubmit, onDeveloperSubmit } = props
  const developerData = account ? account.developer : null

  if (account) {
    return (
      <div className="detailsContainer scroll col-full-height">
        <Account initialValues={account} onSubmit={onAccountSubmit} />
        {account && account.is_developer === true && (
          <Developer
            initialValues={developerData}
            onSubmit={onDeveloperSubmit}
          />
        )}
      </div>
    )
  }
  return null
}

export default WebStoreAccountDetails
