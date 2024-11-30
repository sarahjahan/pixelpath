import './GameForm.scss'
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';
import Select from 'react-select';

const BASE_URL = import.meta.env.VITE_API_URL;

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '30px',
    },
  };

function GameForm({gameid, getGamesLibrary, game, modalIsOpen, closeModal}) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [removedTags, setRemovedTags] = useState([])
  const [tagOptions, setTagOptions] = useState([]);
  const [originalTags, setOriginalTags] = useState((game.tags || []).map((tag) => ({
    id: tag.id,
    name: tag.name,
  })));
  const [tags, setTags] = useState(originalTags);
  const [gameDetails, setGameDetails] = useState({
        title: game.title,
        status: game.status || '',
        notes: game.notes || '',
      });

      useEffect(() => {
        // Fetch all tags from backend
        const getTags = async () => {
          try {
            const { data } = await axios.get(`${BASE_URL}/api/tags`);
            setTagOptions(data.map((tag) => ({ label: tag.name, value: tag.name, id: tag.id })));
          } catch (error) {
            console.error('Error fetching tags:', error);
          }
        };
    
        getTags();

        setGameDetails({
          title: game.title,
          status: game.status || '',
          notes: game.notes || '',
        });
        setOriginalTags((game.tags || []).map((tag) => ({
          id: tag.id,
          name: tag.name,
        })));
        setTags((game.tags || []).map((tag) => ({
          id: tag.id,
          name: tag.name,
        })));
      }, [game]);
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      const sanitizedTags = tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      }));
      try {
        const { data } = await axios.put(`${BASE_URL}/api/games/${gameid}`, {...gameDetails, tags: sanitizedTags, removedTags,});
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

    const handleTagChange = (selectedTags) => {
      const updatedTags = selectedTags.map((tag) => ({
        id: tag.id || null, // Preserve the `id` if available
        name: tag.label || tag.value, // Use `label` or `value` as `name`
      }));
      const removedTags = originalTags.filter(
        (tag) => !updatedTags.some((updatedTag) => updatedTag.id === tag.id)
      );
    
      setTags(updatedTags);
      setRemovedTags(removedTags);
    };


    return(
        <div>
          <Modal
           className="modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            appElement={document.getElementById('root')}>
              
              <h2 className="modal__heading">Edit {gameDetails.title}</h2>
                
                <div className="modal__content">
                <form className="form__field " onSubmit={handleSubmit}>
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
                  <Select 
                    className="gamesList__tags"
                    isMulti
                    isSearchable={isSearchable}
                    isClearable={isClearable}
                    name="tags"
                    options={tagOptions} 
                    placeholder={"Add your tags..."}
                    value={tags.map((tag) => ({
                      label: tag.name,
                      value: tag.name,
                      id: tag.id,
                    }))}
                    onChange={handleTagChange} // Update tags on selection
                  
                  />
                </label>

                <button type="submit">Save</button>
                <button onClick={closeModal}>Close</button>
                </form>
                </div>
              
            </Modal>
          </div>
    )
}

export default GameForm; 