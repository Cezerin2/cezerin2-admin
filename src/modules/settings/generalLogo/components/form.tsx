import React, { useEffect } from 'react'
import ImageUpload from 'modules/shared/imageUpload'
import Paper from 'material-ui/Paper'

const GeneralLogoSettingsForm = () => {
	useEffect(() => props.onLoad(), [])

	const { onImageUpload, onImageDelete, settings } = this.props
	const imageUrl = settings && settings.logo ? settings.logo : ''

	return (
		<Paper className="paper-box" zDepth={1}>
			<div style={{ padding: 30 }}>
				<ImageUpload
					uploading={false}
					imageUrl={imageUrl}
					onDelete={onImageDelete}
					onUpload={onImageUpload}
				/>
			</div>
		</Paper>
	)
}

export default GeneralLogoSettingsForm
