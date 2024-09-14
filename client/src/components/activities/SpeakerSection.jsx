import React, { useState } from 'react';
import { useUser } from '../profile/useUser';

function SpeakerSection() {
  const {
    user: {
      data: {
        data: { role },
      },
    },
  } = useUser();
  const [speakers, setSpeakers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Index to track which speaker is being edited
  const [newSpeaker, setNewSpeaker] = useState({
    id: Date.now(),
    image: '',
    name: '',
    occupation: '',
    designation: '',
  });

  // Handlers for managing form inputs and submission
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpeaker((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSpeaker((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update speaker details
      const updatedSpeakers = [...speakers];

      // If image is not changed during editing, retain the existing image
      if (!newSpeaker.image) {
        updatedSpeakers[editIndex] = {
          ...newSpeaker,
          image: speakers[editIndex].image,
        };
      } else {
        updatedSpeakers[editIndex] = { ...newSpeaker };
      }

      setSpeakers(updatedSpeakers);
    } else {
      // Add new speaker
      setSpeakers((prevState) => [...prevState, newSpeaker]);
    }

    // Reset form state
    setNewSpeaker({
      id: Date.now(),
      image: '',
      name: '',
      occupation: '',
      designation: '',
    });
    setIsFormOpen(false);
    setEditIndex(null);
  };

  const handleEditSpeaker = (index) => {
    setEditIndex(index);
    setNewSpeaker(speakers[index]); // Load speaker's current details into form
    setIsFormOpen(true);
  };

  const handleDeleteSpeaker = (index) => {
    const updatedSpeakers = speakers.filter((_, i) => i !== index);
    setSpeakers(updatedSpeakers);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Add Speaker Button */}
      {role === 'admin' && (
        <button
          className="mb-5 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => setIsFormOpen(true)}
        >
          Add Speaker
        </button>
      )}

      {/* Speakers List */}
      <div className="my-10 flex flex-wrap items-center justify-center gap-20 rounded-lg bg-green-50 p-8 text-center dark:bg-slate-700">
        {speakers.length === 0 ? (
          <p className="tracking-wider text-gray-500 dark:text-gray-100">
            No speakers added yet.
          </p>
        ) : (
          speakers.map((speaker, index) => (
            <div key={speaker.id} className="flex flex-col items-center">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="mb-5 h-36 w-36 rounded-full object-cover"
                style={{ pointerEvents: 'none', userSelect: 'none' }} // Prevent focus and selection
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-grey-300">
                  {speaker.name}
                </h3>
                <p className="my-2 text-lg text-gray-600 dark:text-grey-200">
                  {speaker.occupation}
                </p>
                <p className="text-md text-gray-500 dark:text-grey-100">
                  {speaker.designation}
                </p>
              </div>
              {/* Edit and Delete Speaker Buttons */}
              {role === 'admin' && (
                <div className="mt-2 flex gap-4">
                  <button
                    className="inline-flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-center text-sm font-medium tracking-wider text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
                    onClick={() => handleEditSpeaker(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="ms-2 rounded-lg border border-red-200 bg-red-600 px-4 py-2 text-sm font-medium tracking-wider text-gray-100 hover:bg-red-700 hover:text-grey-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-red-600 dark:bg-red-800 dark:text-gray-100 dark:hover:bg-red-700 dark:hover:text-white dark:focus:ring-gray-700"
                    onClick={() => handleDeleteSpeaker(index)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add or Edit Speaker Form (Pop-up) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {editIndex !== null ? 'Edit Speaker' : 'Add New Speaker'}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newSpeaker.name}
                onChange={handleInputChange}
                className="mb-4 w-full rounded border border-gray-300 p-2"
                required
              />
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={newSpeaker.occupation}
                onChange={handleInputChange}
                className="mb-4 w-full rounded border border-gray-300 p-2"
                required
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={newSpeaker.designation}
                onChange={handleInputChange}
                className="mb-4 w-full rounded border border-gray-300 p-2"
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4 w-full"
              />
              <button
                type="submit"
                className="w-full rounded bg-green-500 px-4 py-2 text-white"
              >
                {editIndex !== null ? 'Update Speaker' : 'Add Speaker'}
              </button>
            </form>
            <button
              className="mt-4 w-full rounded bg-red-500 px-4 py-2 text-white"
              onClick={() => {
                setIsFormOpen(false);
                setEditIndex(null);
                setNewSpeaker({
                  id: Date.now(),
                  image: '',
                  name: '',
                  occupation: '',
                  designation: '',
                }); // Reset newSpeaker state when closing form
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpeakerSection;
