import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import Paper from "@material-ui/core/Paper"
import FlatButton from "material-ui/FlatButton"
import TextField from "material-ui/TextField"
import React, { useState } from "react"
import messages from "../../../../../lib/text"
import Gallery from "../../../../../modules/shared/imageUploadMultiple"

const ProductImages = (props: Readonly<{}>) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [imageData, setImageData] = useState(null)

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const openEdits = () => {
    setOpenEdit(true)
  }

  const handleEditOpen = image => {
    setImageData(image)
    openEdits()
  }

  const handleEditSave = () => {
    props.onImageUpdate(imageData)
    closeEdit()
  }

  const handleAltChange = (event, value) => {
    const newImageData = Object.assign({}, imageData, {
      alt: value,
    })
    setImageData(newImageData)
  }

  const {
    productId,
    images,
    onImageDelete,
    onImageSort,
    onImageUpload,
    uploadingImages,
  } = props
  const alt = imageData ? imageData.alt : ""

  return (
    <Paper className="paper-box" elevation={1}>
      <div style={{ padding: "10px 10px 30px 10px" }}>
        <Gallery
          productId={productId}
          images={images}
          onImageDelete={onImageDelete}
          onImageSort={onImageSort}
          onImageUpload={onImageUpload}
          uploading={uploadingImages}
          onImageEdit={handleEditOpen}
        />
        <Dialog
          contentStyle={{ maxWidth: 540 }}
          title={messages.edit}
          modal={false}
          open={openEdit}
          onRequestClose={closeEdit}
          autoScrollBodyContent={false}
        >
          <div style={{ width: "500px", margin: "25px" }}>
            <TextField
              floatingLabelText={messages.alt}
              fullWidth
              value={alt}
              onChange={handleAltChange}
            />
          </div>
          <DialogActions>
            <FlatButton
              label={messages.cancel}
              onClick={closeEdit}
              style={{ marginRight: 10 }}
            />
            <FlatButton
              label={messages.save}
              primary
              keyboardFocused
              onClick={handleEditSave}
            />
          </DialogActions>
        </Dialog>
      </div>
    </Paper>
  )
}

export default ProductImages
