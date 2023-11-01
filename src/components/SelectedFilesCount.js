import React from 'react';

const SelectedFilesCount = ({ count, onDeleteSelectedImages }) => {
  const getSelectedImageCount = () => `${count} files selected`;

  return (
    <div className="selected-files-count">
      <p>{getSelectedImageCount()}</p>
      {count > 0 && (
        <a href="#delete" onClick={onDeleteSelectedImages} className="delete-link top-right">
          Delete files
        </a>
      )}
    </div>
  );
};

export default SelectedFilesCount;
