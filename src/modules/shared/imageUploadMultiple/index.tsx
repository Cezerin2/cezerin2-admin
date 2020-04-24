import React from "react"
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc"
import "./style.sass"
import GalleryItem from "./item"
import MultiUploader from "./uploader"

const SortableItem = SortableElement(({ image, onDelete, onImageEdit }) => (
  <li className="item">
    <GalleryItem
      url={image.url}
      alt={image.alt}
      id={image.id}
      onDelete={onDelete}
      onImageEdit={() => {
        onImageEdit(image)
      }}
    />
  </li>
))

const SortableList = SortableContainer(({ items, onDelete, onImageEdit }) => (
  <ul className="list">
    {items.map((value, index) => (
      <SortableItem
        key={`item-${index}`}
        index={index}
        image={value}
        onDelete={onDelete}
        onImageEdit={onImageEdit}
      />
    ))}
  </ul>
))

const Gallery = ({
  productId,
  images,
  onImageDelete,
  onImageSort,
  onImageUpload,
  uploading,
  onImageEdit,
}) => {
  if (images && images.length > 0) {
    return (
      <MultiUploader onUpload={onImageUpload} uploading={uploading}>
        <div className="gallery">
          <SortableList
            axis="x"
            items={images}
            onDelete={imageId => {
              onImageDelete(productId, imageId)
            }}
            onImageEdit={onImageEdit}
            onSortEnd={({ oldIndex, newIndex }) => {
              const sortedItems = arrayMove(images, oldIndex, newIndex)
              const withNewPosition = sortedItems.map((image, index) => {
                image.position = index
                return image
              })
              onImageSort(productId, withNewPosition)
            }}
          />
        </div>
      </MultiUploader>
    )
  }
  return <MultiUploader onUpload={onImageUpload} uploading={uploading} />
}

export default Gallery
