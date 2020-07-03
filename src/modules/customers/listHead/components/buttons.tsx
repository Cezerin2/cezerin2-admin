import { Button, Dialog, DialogActions, IconButton } from "@material-ui/core"
import { Add, Delete, Edit, Folder } from "@material-ui/icons"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import GroupSelect from "../../../../modules/customerGroups/select"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import Search from "./search"

const Buttons = props => {
  const [groupID, setGroupID] = useState(null)
  const [openSetGroup, setOpenSetGroup] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { search, setSearch, selectedCount, onDelete, onCreate, onEdit } = props

  const deleteCustomers = () => {
    setOpenDelete(false)
    onDelete()
  }

  const saveSetGroup = () => {
    setOpenSetGroup(false)
    props.onSetGroup(groupID)
  }

  return (
    <>
      <Search value={search} setSearch={setSearch} />
      {selectedCount > 0 && (
        <>
          {selectedCount == 1 && (
            <IconButton
              touch={true}
              tooltipPosition="bottom-left"
              tooltip={messages.actions_edit}
              onClick={onEdit}
            >
              <Edit color="primary" className="material-icons" />
            </IconButton>
          )}
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={() => setOpenDelete(false)}
          >
            <Delete color="primary" className="material-icons" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.customers_setGroup}
            onClick={() => setOpenSetGroup(true)}
          >
            <Folder color="primary" className="material-icons" />
          </IconButton>
          <DeleteConfirmation
            open={() => setOpenDelete(true)}
            isSingle={false}
            itemsCount={selectedCount}
            onCancel={() => setOpenDelete(false)}
            onDelete={deleteCustomers}
          />
          <Dialog
            title={messages.customers_setGroup}
            modal={false}
            open={openSetGroup}
            onRequestClose={() => setOpenSetGroup(false)}
            autoScrollBodyContent
          >
            <GroupSelect
              onSelect={groupID => setOpenSetGroup(groupID)}
              selectedId={groupID}
              showRoot
              showAll={false}
            />
            <DialogActions>
              <Button
                onClick={() => setOpenSetGroup(false)}
                style={{ marginRight: 10 }}
              >
                {messages.cancel}
              </Button>
              <Button color="primary" keyboardFocused onClick={saveSetGroup}>
                {messages.save}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      {selectedCount < 1 && (
        <IconButton
          touch={true}
          tooltipPosition="bottom-left"
          tooltip={messages.customers_titleAdd}
          onClick={onCreate}
        >
          <Add color="primary" className="material-icons" />
        </IconButton>
      )}
    </>
  )
}

export default Buttons
