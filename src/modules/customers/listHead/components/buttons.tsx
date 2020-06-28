import { Button, Dialog, DialogActions, IconButton } from "@material-ui/core"
import { Add, Delete, Edit, Folder } from "@material-ui/icons"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import GroupSelect from "../../../../modules/customerGroups/select"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import Search from "./search"

const Buttons = (props: Readonly<{}>) => {
  const [groupId, setGroupId] = useState(null)
  const [openSetGroup, setOpenSetGroup] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const showSetGroup = () => {
    setOpenSetGroup(true)
  }

  const showDelete = () => {
    setOpenDelete(true)
  }

  const closeSetGroup = () => {
    setOpenSetGroup(false)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const deleteCustomers = () => {
    setOpenDelete(false)
    onDelete()
  }

  const saveSetGroup = () => {
    setOpenSetGroup(false)
    onSetGroup(groupId)
  }

  const selectSetGroup = (groupId: string) => {
    setGroupId(groupId)
  }

  const {
    search,
    setSearch,
    selectedCount,
    onDelete,
    onCreate,
    onEdit,
    onSetGroup,
  } = props

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
              <Edit color="secondary" className="material-icons" />
            </IconButton>
          )}
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={showDelete}
          >
            <Delete color="secondary" className="material-icons" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.customers_setGroup}
            onClick={showSetGroup}
          >
            <Folder color="secondary" className="material-icons" />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle={false}
            itemsCount={selectedCount}
            onCancel={closeDelete}
            onDelete={deleteCustomers}
          />
          <Dialog
            title={messages.customers_setGroup}
            modal={false}
            open={openSetGroup}
            onRequestClose={closeSetGroup}
            autoScrollBodyContent
          >
            <GroupSelect
              onSelect={selectSetGroup}
              selectedId={groupId}
              showRoot
              showAll={false}
            />
            <DialogActions>
              <Button onClick={closeSetGroup} style={{ marginRight: 10 }}>
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
          <Add color="#fff" className="material-icons" />
        </IconButton>
      )}
    </>
  )
}

export default Buttons
