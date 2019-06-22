import React from 'react';
import api from 'lib/api';
import ImageUpload from 'modules/shared/imageUpload';
import settings from 'lib/settings';

export default class ThemeImageUpload extends React.Component {
	onDelete = () => {
		const fileName = this.props.input.value;
		api.theme.assets.deleteFile(fileName).then(() => {
			this.props.input.onChange('');
		});
	};

	onUpload = formData => {
		api.theme.assets.uploadFile(formData).then(({ status, json }) => {
			const imageUrl = json.url;
			this.props.input.onChange(imageUrl);
		});
	};

	render() {
		const { input, label } = this.props;

		return (
			<div>
				<p>{label}</p>
				<ImageUpload
					uploading={false}
					imageUrl={input.value}
					onDelete={this.onDelete}
					onUpload={this.onUpload}
				/>
			</div>
		);
	}
}
