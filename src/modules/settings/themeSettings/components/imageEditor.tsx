import React from "react"
import api from "../../../../lib/api"
import ImageUpload from "../../../../modules/shared/imageUpload"

const ThemeImageUpload = (props: Readonly<{ input; label }>) => {
  const { input, label } = props

  const onDelete = () => {
    const fileName = input.value
    api.theme.assets.deleteFile(fileName).then(() => {
      input.onChange("")
    })
  }

  const onUpload = formData => {
    const { json } = api.theme.assets.uploadFile(formData)
    try {
      const imageUrl = json.url.input.onChange(imageUrl)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <p>{label}</p>
      <ImageUpload
        uploading={false}
        imageUrl={input.value}
        onDelete={onDelete}
        onUpload={onUpload}
      />
    </>
  )
}

export default ThemeImageUpload
