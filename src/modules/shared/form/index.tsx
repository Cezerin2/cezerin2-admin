import React,{useEffect} from 'react'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import {  ListItem } from 'material-ui/List'

export const CustomToggle = ({
	input,
	label,
	className = '',
	disabled = false,
	style,
}) => (
	<Toggle
		label={label}
		toggled={!!input.value}
		onToggle={(event, isInputChecked) => {
			input.onChange(isInputChecked)
		}}
		className={className}
		disabled={disabled}
		style={style}
	/>
)

export const NumberField = ({
	input,
	label,
	disabled = false,
}) => (
	<TextField
		floatingLabelText={label}
		fullWidth
		disabled={disabled}
		value={input.value}
		type="number"
		onChange={( value) => {
			let number = parseFloat(value)
			number = number || 0
			input.onChange(number)
		}}
	/>
)

export const ColorField = ({ input }) => (
	<input {...input} type="color" />
)

export const MultiSelect = () => {
	
		const values = Array.isArray(props.input.value) ? props.input.value : []
		const state = {
			selectedItems: values,
		}
	}

	useEffect([prop.count](nextProps) {
		const values = Array.isArray(nextProps.input.value)
			? nextProps.input.value
			: []
		if (values !== state.selectedItems) {
			set(
				selectedItems: values,
			})
		}
	}

	const onCheckboxChecked = (item) => {
		const { selectedItems } = state
		let newSelectedItems = []
		if (selectedItems.includes(item)) {
			newSelectedItems = selectedItems.filter((i) => i !== item)
		} else {
			newSelectedItems = [...selectedItems, item]
		}
		newSelectedItems.sort()
		set( selectedItems: newSelectedItems })
		props.input.onChange(newSelectedItems)
	}

	const isCheckboxChecked = (item) => state.selectedItems.includes(item)

	
		const { items, disabled, columns = 2 } = props
		const columnsconst = 12 / columns

		const elements = items.map((item, index) => (
			<div className={`col-xs-12 col-sm-${columnsClass}`} key={index}>
				{item && item !== '' && (
					<ListItem
						leftCheckbox={
							<Checkbox
								checked={isCheckboxChecked(item)}
								disabled={disabled}
								onCheck={(e, isChecked) => {
									onCheckboxChecked(item)
								}}
							/>
						}
						primaryText={item}
					/>
				)}
			</div>
		))

		return (
			<List>
				<div className="row">{elements}</div>
			</List>
		)
	}

