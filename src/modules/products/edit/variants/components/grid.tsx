import { Button, IconButton, MenuItem, Paper, Select } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { Link } from "@reach/router"
import React, { useState } from "react"
import messages from "../../../../../lib/text"
import style from "./style.module.sass"

const VariantInput = (props: Readonly<{}>) => {
  const [value, setValue] = useState(props.value)

  const { type, placeholder, variantId, onChange } = props

  const onBlur = () => {
    onChange(variantId, value)
  }

  return (
    <input
      type={type}
      className={style.textInput}
      placeholder={placeholder}
      value={value}
      onChange={event => setValue(event.target.value)}
      onBlur={onBlur}
      min="0"
    />
  )
}

const VariantRow = (
  props: Readonly<{
    variant
    options
    onSkuChange
    onPriceChange
    onStockChange
    onWeightChange
    onOptionChange
    onDeleteVariant
  }>
) => {
  const {
    variant,
    options,
    onSkuChange,
    onPriceChange,
    onStockChange,
    onWeightChange,
    onOptionChange,
    onDeleteVariant,
  } = props

  const cols = options.map((option, index) => {
    const variantOption = variant.options.find(i => i.option_id === option.id)
    const variantOptionValueId = variantOption ? variantOption.value_id : null

    if (option.values && option.values.length > 0) {
      const menuItems = option.values
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        .map((value, index) => (
          <MenuItem key={index} value={value.id}>
            {value.name}
          </MenuItem>
        ))
      return (
        <div key={option.id} className={style.gridCol}>
          <Select
            value={variantOptionValueId}
            style={{ width: "100%" }}
            underlineStyle={{ border: "none" }}
            onChange={(event, key, value) => {
              onOptionChange(variant.id, option.id, value)
            }}
          >
            {menuItems}
          </Select>
        </div>
      )
    }
    return <div key={option.id} className={style.gridCol} />
  })

  return (
    <div className={style.gridRow}>
      <div className={style.gridCol}>
        <VariantInput
          type="text"
          placeholder=""
          variantId={variant.id}
          value={variant.sku}
          onChange={onSkuChange}
        />
      </div>
      <div className={style.gridCol}>
        <VariantInput
          type="number"
          placeholder="0"
          variantId={variant.id}
          value={variant.price}
          onChange={onPriceChange}
        />
      </div>
      <div className={style.gridCol}>
        <VariantInput
          type="number"
          placeholder="0"
          variantId={variant.id}
          value={variant.stock_quantity}
          onChange={onStockChange}
        />
      </div>
      <div className={style.gridCol}>
        <VariantInput
          type="number"
          placeholder="0"
          variantId={variant.id}
          value={variant.weight}
          onChange={onWeightChange}
        />
      </div>
      {cols}
      <div className={style.gridCol}>
        <IconButton
          title={messages.actions_delete}
          onClick={() => {
            onDeleteVariant(variant.id)
          }}
          tabIndex={-1}
        >
          <Delete color="#a1a1a1" className="material-icons" />
        </IconButton>
      </div>
    </div>
  )
}

const ProductVariantsGrid = ({
  settings,
  options,
  variants,
  createVariant,
  deleteVariant,
  createOption,
  productId,
  onSkuChange,
  onPriceChange,
  onStockChange,
  onWeightChange,
  onOptionChange,
}) => {
  const hasOptions = options && options.length > 0
  const hasVariants = variants && variants.length > 0

  const headRowCols = hasOptions
    ? options.map((option, index) => (
        <div key={index} className={style.gridCol}>
          <Link
            title={messages.editProductOption}
            to={`/product/${productId}/option/${option.id}`}
          >
            {option.name}
          </Link>
        </div>
      ))
    : null

  const variantRows = hasVariants
    ? variants.map((variant, index) => (
        <VariantRow
          key={index}
          variant={variant}
          options={options}
          onSkuChange={onSkuChange}
          onPriceChange={onPriceChange}
          onStockChange={onStockChange}
          onWeightChange={onWeightChange}
          onOptionChange={onOptionChange}
          onDeleteVariant={deleteVariant}
        />
      ))
    : null

  return (
    <Paper className="paper-box" elevation={1}>
      <div className={style.grid}>
        <div className={style.gridHeadRow}>
          <div className={style.gridCol}>{messages.products_sku}</div>
          <div className={style.gridCol}>{messages.products_price}</div>
          <div className={style.gridCol}>{messages.products_stock}</div>
          <div className={style.gridCol}>{messages.products_weight}</div>
          {headRowCols}
          <div className={style.gridCol} />
        </div>
        {variantRows}
      </div>
      <div className={style.innerBox}>
        <Button
          onClick={createVariant}
          style={{ marginRight: 20 }}
          disabled={!hasOptions}
        >
          {messages.addVariant}
        </Button>
        <Button onClick={createOption}>{messages.addOption}</Button>
      </div>
    </Paper>
  )
}

export default ProductVariantsGrid
