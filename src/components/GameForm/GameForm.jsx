import './GameForm.scss'
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';
import CreatableSelect from 'react-select/creatable';


const BASE_URL = import.meta.env.VITE_API_URL;


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  


function GameForm({gameid, getGamesLibrary, game, modalIsOpen, closeModal}) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  // const [modalIsOpen, setIsOpen] = useState(true);
  const [gameDetails, setGameDetails] = useState({
        title: game.title,
        status: game.status || '',
        notes: game.notes || '',
      });

    function openModal() {
        setIsOpen(true);
      }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(`${BASE_URL}/api/games/${gameid}`, gameDetails);
        alert(`${game.title} was sucessfully updated. Refreshing Games list.`);
        closeModal(); 
        getGamesLibrary();
      } catch (error) {
        alert(`Error updating ${game.title}`, error);
        console.log(error.response?.data?.message || error);
      }
    };


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setGameDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    // const handleTagCreation = (selectedTags) => {
    //   const newTags = selectedTags.map((tag) => tag.label); // Only store tag labels
    //   setGameDetails((prevDetails) => ({ ...prevDetails, tags: newTags }));
    // };

  const tagOptions = Array.isArray(game.tags)
      ? game.tags.map(tag => ({
          label: tag,
          value: tag.toLowerCase().replace(/\s+/g, "_") // Create a value for react-select
      }))
      : [];

      const handleTagCreation = async (selectedTags) => {
        const newTag = selectedTags[selectedTags.length - 1]; // get most recently selected or created tag
    
        if (!newTag || newTag.value === "") return; // checks if the tag is empty or invalid
    
        try {
          const response = await axios.post(`${BASE_URL}/api/tags/`, {
            tagName: newTag.label, // Send the tag's label (name) to the backend
            gameId: game.id, 
       
          });
    
          if (response.ok) {
            // Optionally, you can update the tags state here if you want to immediately reflect the added tag
            console.log("Tag created successfully");
          } else {
            console.error("Failed to add tag:", response.data.message)
            console.log(response.data.message);
          }
        } catch (error) {
          console.error("Error creating tag:", error);
        }
      };



    // useEffect(() => {
    //   if (onClick) {
    //       openModal();
    //     }
    //   }, [onClick]);


    // useEffect(() => {
    //     const fetchGameDetails = async () => {
    //       const response = await axios.get(`/api/games/${gameid}`);
    //       setGameDetails(response.data); // Pre-populate form with game data
    //     };
    //     fetchGameDetails();
    //   }, [gameid]);



    return(
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            // style={customStyles}
            contentLabel="Example Modal"
            appElement={document.getElementById('root')}>
              
              <h2>Edit Game</h2>
                <div>Edit your game experiences below:</div>
                
                <form className="form__field" onSubmit={handleSubmit}>
                <h3> Title: {gameDetails.title}</h3>
                <label> Status:
                    <input
                    className="form__input"
                    type="text"
                    name="status"
                    value={gameDetails.status}
                    onChange={handleInputChange}/>
                </label>
                <label> Notes:
                    <input
                    className="form__input"
                    type="text"
                    name="notes"
                    value={gameDetails.notes}
                    placeholder={"Add your own notes..."}
                    onChange={handleInputChange}/>
                </label>
                <label> Tags:
                  <CreatableSelect 
                    className="gamesList__tags"
                    isMulti
                    isSearchable={isSearchable}
                    isClearable={isClearable}
                    name="tags"
                    options={tagOptions} 
                    placeholder={"Add your own tags..."}
                    onChange={handleTagCreation}/>
                  </label>

                <button type="submit">Save</button>
                <button onClick={closeModal}>Close</button>
                </form>
              
            </Modal>
          </div>
    )
}

export default GameForm; 