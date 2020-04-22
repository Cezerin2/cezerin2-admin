import React from 'react'
import messages from 'lib/text'
import DeleteConfirmation from 'modules/shared/deleteConfirmation'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

export default const Buttons = () => {
	
		
		state = {
			openDelete: false,
		}
	}

	showDelete = () => {
		set( openDelete: true })
	}

	closeDelete = () => {
		set( openDelete: false })
	}

	deleteGroup = () => {
		set( openDelete: false })
		props.onDelete(props.shippingMethod.id)
	}

	
		const { shippingMethod, onDelete } = props
		const methodName =
			shippingMethod &&
			shippingMethod.name &&
			shippingMethod.name.length > 0
				? shippingMethod.name
				: 'Draft'

		return (
			<span>
				<IconButton
					touch
					tooltipPosition="bottom-left"
					tooltip={messages.actions_delete}
					onClick={showDelete}
				>
					<FontIcon color="#fff" className="material-icons">
						delete
					</FontIcon>
				</IconButton>
				<DeleteConfirmation
					open={state.openDelete}
					isSingle
					itemsCount={1}
					itemName={methodName}
					onCancel={closeDelete}
					onDelete={deleteGroup}
				/>
			</span>
		)
	}
}
