import React, { useState } from 'react';

const SocialMediaForm = ({ setNewPost}) => {
  // State variables
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Event handlers
  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageURL(URL.createObjectURL(selectedImage)); // Create temporary URL
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object to send image file
    const formData = {
        "caption": caption,
        "image_url": imageURL,
        "user_id": 1
    }

    try {
      const response = await fetch('http://localhost:5555/posts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      // Reset form after successful submission
      setCaption('');
      setImage(null);
      setImageURL('');

      const responseData = await response.json();
      setSubmittedData(responseData);
      setNewPost(responseData)

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="caption" className="block text-gray-700 font-bold mb-2">
            Caption:
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Select Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {imageURL && (
            <img
              src={imageURL}
              alt="Selected"
              className="mt-2 max-w-xs"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>

      {/* {submittedData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Submitted Data</h2>
          <div className="flex items-center">
            <img
              src={submittedData.image_url}
              alt="Submitted"
              className="max-w-xs"
            />
            <p className="ml-4">{submittedData.caption}</p>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SocialMediaForm;
