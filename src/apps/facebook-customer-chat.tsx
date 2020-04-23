import React, { useState, useEffect } from 'react'
import messages from '../lib/text'
import api from '../lib/api'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export const Description = {
	key: 'facebook-customer-chat',
	name: 'Facebook Customer Chat',
	coverUrl: '/assets/images/apps/messenger.webp',
	description: `<p>The Messenger Platform's customer chat plugin allows you to integrate your Messenger experience directly into your website. This allows your customers to interact with your business anytime with the same personalized, rich-media experience they get in Messenger.</p>
  <p><img src='/assets/images/apps/facebook-customer-chat-plugin.webp' /></p>
  <p>The customer chat plugin automatically loads recent chat history between the person and your business, meaning recent interactions with your business on messenger.com, in the Messenger app, or in the customer chat plugin on your website will be visible. This helps create a single experience for your customers, and enables you to continue the conversation even after they have left your webpage. No need to capture their information to follow up, just use the same conversation in Messenger.</p>
  <p>To access your Facebook's Page ID:</p>
  <ol>
    <li>Open your Facebook page.</li>
    <li>Click the About tab.</li>
    <li>Scroll down to the bottom of the Page Info section.</li>
    <li>Next to Facebook Page ID, you can find your page ID.</li>
  </ol>`,
}

const CHAT_CODE = `<div class="fb-customerchat" page_id="PAGE_ID" minimized="IS_MINIMIZED"></div>`

export const App = () => {
	const [pageId, setPageID] = useState('')
	const [minimized, setMinimized] = useState(false)

	const handlePageIdChange = (event) => {
		setPageId(event.target.value)
	}

	const handleMinimizedChange = (event) => {
		setMinimized(event.target.value)
	}

	const fetchSettings = () => {
		api.apps.settings
			.retrieve('facebook-customer-chat')
			.then(({ json }) => {
				const appSettings = json
				if (appSettings) {
					set(
						pageId: appSettings.pageId,
						minimized: appSettings.minimized,
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const updateSettings = () => {
		const { pageId, minimized } = state
		const htmlCode =
			pageId && pageId.length > 0
				? CHAT_CODE.replace(/PAGE_ID/g, pageId).replace(
						/IS_MINIMIZED/g,
						minimized
				  )
				: ''

		api.apps.settings.update('facebook-customer-chat', {
			pageId,
			minimized,
		})
		api.theme.placeholders.update('facebook-customer-chat', {
			place: 'body_end',
			value: htmlCode,
		})
	}

	useEffect(() => fetchSettings(), [])

	return (
		<>
			<TextField
				type="text"
				fullWidth
				value={pageId}
				onChange={handlePageIdChange}
				floatingLabelText="Page ID"
			/>

			<TextField
				type="text"
				fullWidth
				value={minimized}
				onChange={handleMinimizedChange}
				floatingLabelText="minimized"
				hintText="false"
			/>

			<div style={{ textAlign: 'right' }}>
				<RaisedButton
					label={messages.save}
					primary
					disabled={false}
					onClick={updateSettings}
				/>
			</div>
		</>
	)
}
