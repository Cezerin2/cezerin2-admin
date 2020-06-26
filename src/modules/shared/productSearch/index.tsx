import { Button } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import { Table, TableBody, TableRow, TableRowColumn } from "material-ui/Table"
import TextField from "material-ui/TextField"
import React, { useEffect, useState } from "react"
import api from "../../../lib/api"
import * as helper from "../../../lib/helper"
import messages from "../../../lib/text"

const SearchBox = ({
  text,
  onChange,
}: {
  text: string
  onChange: Function
}) => (
  <TextField
    fullWidth
    floatingLabelText={messages.products_search}
    onChange={onChange}
    value={text}
  />
)

const SearchResult = (props: any) => {
  const { products, selectedId, settings, onSelect } = props
  const rows = products.map((product, index) => {
    const priceFormatted = helper.formatCurrency(product.price, settings)
    const isSelected = product.id === selectedId

    return (
      <TableRow key={index} selected={isSelected}>
        <TableRowColumn>{product.name}</TableRowColumn>
        <TableRowColumn>{product.category_name}</TableRowColumn>
        <TableRowColumn>{product.sku}</TableRowColumn>
        <TableRowColumn style={{ textAlign: "right" }}>
          {priceFormatted}
        </TableRowColumn>
      </TableRow>
    )
  })

  return (
    <Table
      height="400px"
      selectable
      multiSelectable={false}
      onRowSelection={onSelect}
    >
      <TableBody>{rows}</TableBody>
    </Table>
  )
}

const ConfirmationDialog = (
  props: Readonly<{
    open: boolean
    title: string
    submitLabel: string
    cancelLabel: string
    modal: boolean
    settings: string
    onSubmit: Function
    onCancel: Function
  }>
) => {
  const [open, setOpen] = useState(props.open)
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    if (open !== props.open) {
      setOpen(props.open)
    }
  }, [props.open])

  const handleCancel = () => {
    setOpen(false)
    if (props.onCancel) {
      props.onCancel()
    }
  }

  const handleSubmit = () => {
    setOpen(false)
    if (props.onSubmit) {
      props.onSubmit(selectedId)
    }
  }

  const handleRowSelection = (selectedRows: []) => {
    if (selectedRows && selectedRows.length > 0) {
      const selectedIndex = selectedRows[0]
      const selectedProductId =
        products && products.length >= selectedIndex
          ? products[selectedIndex].id
          : null
      setSelectedId(selectedProductId)
    }
  }

  const handleSearch = (event, value) => {
    setSearch(value)

    const productsResponse = api.products.list({
      limit: 50,
      enabled: true,
      discontinued: false,
      fields:
        "id,name,category_id,category_name,sku,enabled,discontinued,price,on_sale,regular_price",
      search: value,
    })
    try {
      setProducts(productsResponse.json.data)
    } catch (error) {
      console.error(error)
    }
  }

  const { title, submitLabel, cancelLabel, modal = false, settings } = props

  return (
    <Dialog
      title={title}
      actionsContainerStyle={{ borderTop: "1px solid rgb(224, 224, 224)" }}
      modal={modal}
      open={open}
      onRequestClose={handleCancel}
    >
      <>
        <SearchBox text={search} onChange={handleSearch} />
        <SearchResult
          products={products}
          selectedId={selectedId}
          onSelect={handleRowSelection}
          settings={settings}
        />
      </>
      <DialogActions>
        <Button onClick={handleCancel} style={{ marginRight: 10 }}>
          {cancelLabel}
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
