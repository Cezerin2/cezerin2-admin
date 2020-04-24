import React from "react"
import api from "../../../../lib/api"
import ImageUpload from "../../../../modules/shared/imageUpload"

const ThemeImageUpload = props => {
  const onDelete = () => {
    const fileName = props.input.value
    api.theme.assets.deleteFile(fileName).then(() => {
      props.input.onChange("")
    })
  }

  const onUpload = formData => {
    api.theme.assets.uploadFile(formData).then(({ json }) => {
      const imageUrl = json.url
      props.input.onChange(imageUrl)
    })
  }

  const { input, label } = props

  return (
    <div>
      <p>{label}</p>
      <ImageUpload
        uploading={false}
        imageUrl={input.value}
        onDelete={onDelete}
        onUpload={onUpload}
      />
    </div>
  )
}

export default ThemeImageUpload
