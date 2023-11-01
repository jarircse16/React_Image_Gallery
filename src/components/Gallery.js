import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../css/gallery.css';
import SelectedFilesCount from './SelectedFilesCount';


function importAll(r) {
  return r.keys().map(r);
}

const imageFiles = importAll(require.context('../../public/images', false, /\.(png|webp|jpe?g|svg)$/));

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [featureImageIndex, setFeatureImageIndex] = useState(0);

  useEffect(() => {
    const imageList = imageFiles.map((url, index) => ({
      id: index,
      url,
      isFeatured: index === featureImageIndex,
    }));

    setImages(imageList);
  }, [featureImageIndex]);

  const handleSetFeatureImage = (index) => {
    setFeatureImageIndex(index);
  };

  const handleImageCheckboxChange = (imageId) => {
    if (selectedImageIds.includes(imageId)) {
      setSelectedImageIds(selectedImageIds.filter((id) => id !== imageId));
    } else {
      setSelectedImageIds([...selectedImageIds, imageId]);
    }
  };



  const handleDeleteSelectedImages = () => {
    if (selectedImageIds.length === 0) return;

    if (window.confirm('Are you sure you want to delete the selected images?')) {
      const updatedImages = images.filter((image) => !selectedImageIds.includes(image.id));
      setImages(updatedImages);
      setSelectedImageIds([]);
    }
  };

  const isSelected = (imageId) => selectedImageIds.includes(imageId);

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = [...images];
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImages(reorderedImages);
    setFeatureImageIndex(0);
  };

  const fileInputRef = useRef(null);

   const handleAddImages = () => {
     // Trigger file input click
     fileInputRef.current.click();
   };

   const handleFileInputChange = (event) => {
     const selectedFiles = Array.from(event.target.files);
     // Process the selected files as needed
     if (selectedFiles.length > 0) {
       const newImages = selectedFiles.map((file, index) => ({
         id: images.length + index,
         url: URL.createObjectURL(file),
         isFeatured: false,
       }));
       setImages([...images, ...newImages]);
     }
     // Clear the file input
     event.target.value = null;
   };


  // ...
return (
  <div className="gallery">
    <h1>Image Gallery</h1>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="image-grid" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="image-grid"
          >
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`image ${image.isFeatured ? 'featured' : ''} ${isSelected(image.id) ? 'selected' : ''}`}
                    onClick={() => handleSetFeatureImage(image.id)}
                    style={{
                      ...provided.draggableProps.style,
                      border: snapshot.isDragging ? '2px dashed #ccc' : '1px solid #ccc',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected(image.id)}
                      onChange={() => handleImageCheckboxChange(image.id)}
                    />
                    <img src={image.url} alt={`Image ${image.id}`} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <SelectedFilesCount count={selectedImageIds.length} onDeleteSelectedImages={handleDeleteSelectedImages} />
    <div className="add-image" style={{ cursor: 'pointer' }}>
         <img
           src={require("./../images/upload.jpeg")}
           width="100"
           height="100"
           onClick={handleAddImages}
           alt="Upload Image"
         />
         <input
           type="file"
           ref={fileInputRef}
           onChange={handleFileInputChange}
           accept="image/*"
           multiple
           style={{ display: 'none' }}
         />
       </div>
  </div>
);
// ...

};

export default Gallery;
