import Paper from "@material-ui/core/Paper"
import React, { useEffect } from "react"
import ImageUpload from "../../../../modules/shared/imageUpload"

const GeneralLogoSettingsForm = props => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { onImageUpload, onImageDelete, settings } = props
  const imageUrl = settings && settings.logo ? settings.logo : ""

  return (
    <Paper className="paper-box" elevation={1}>
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
