import './GameForm.scss'
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Modal from 'react-modal';



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
  


function GameForm({gameid, onClick, getGamesLibrary, game}) {
    const [modalIsOpen, setIsOpen] = useState(true);
    const [gameDetails, setGameDetails] = useState({
        status: '',
        notes: '',
        tags: ''
      });

    const navigate = useNavigate();

    useEffect(() => {
        if (onClick) {
          openModal();
        }
      }, [onClick]);


    function openModal() {
        setIsOpen(true);
      }
  
    function closeModal() {
      setIsOpen(false);
    }

    // useEffect(() => {
    //     const fetchGameDetails = async () => {
    //       const response = await axios.get(`/api/games/${gameid}`);
    //       setGameDetails(response.data); // Pre-populate form with game data
    //     };
    //     fetchGameDetails();
    //   }, [gameid]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.put(`${BASE_URL}/api/games/${gameid}`, gameDetails);
          alert(`${game.title} was sucessfully updated. Refreshing Games list.`);
          closeModal(); 
          getGamesLibrary();
        } catch (error) {
          alert(`Error updating ${game.title}`, error);
          console.log(error.response.data.message)
        }
      };


    return(
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            // style={customStyles}
            contentLabel="Example Modal">
              
              <h2>Edit Game</h2>
                <div>Edit your game experiences below:</div>
                
                <form className="form__field" onSubmit={handleSubmit}>
                <label> Title: 
                    <input
                    className="form__input"
                    type="text"
                    value={game.title}/>
                </label>
                <label> Status:
                    <input
                    className="form__input"
                    type="text"
                    value={game.status}
                    onChange={(e) => setGameDetails({ ...gameDetails, status: e.target.value })}/>
                </label>
                <label> Notes:
                    <input
                    className="form__input"
                    type="text"
                    value={game.notes}
                    onChange={(e) => setGameDetails({ ...gameDetails, notes: e.target.value })}/>
                </label>
                <label> Tags:
                    <input
                    className="form__input"
                    type="text"
                    value={game.tags}
                    onChange={(e) => setGameDetails({ ...gameDetails, tags: e.target.value })}/>
                </label>
             
                <button type="submit">Save</button>
                <button onClick={closeModal}>Close</button>
                </form>
              
            </Modal>
          </div>
    )
}

export default GameForm; 