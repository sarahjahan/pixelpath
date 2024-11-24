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
  


function GameForm({gameid, onClick, getGamesLibrary}) {
    const [modalIsOpen, setIsOpen] = useState(true);
    // const [ game, setGame] = useState(gameid)
    const [gameDetails, setGameDetails] = useState({
        title: '',
        summary: '',
        rating: ''
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
          alert(`${gameid} was sucessfully updated. Refreshing Games list.`);
          closeModal(); 
          getGamesLibrary();
        } catch (error) {
          alert(`Error updating game with id: ${gameid}`, error);
          console.log(error)
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
                <div>Edit game below:</div>
                
                <form className="form__field" onSubmit={handleSubmit}>
                <label> Title: 
                    <input
                    className="form__input"
                    type="text"
                    value={gameDetails.title}
                    onChange={(e) => setGameDetails({ ...gameDetails, title: e.target.value })}/>
                    </label>
                <label> Summary:
                    <input
                    className="form__input"
                    type="text"
                    value={gameDetails.summary}
                    onChange={(e) => setGameDetails({ ...gameDetails, summary: e.target.value })}/>
                </label>
                <label> Rating:
                    <input
                    className="form__input"
                    type="text"
                    value={gameDetails.rating}
                    onChange={(e) => setGameDetails({ ...gameDetails, rating: e.target.value })}/>
                </label>
             
                <button>Save</button>
                <button onClick={closeModal}>Close</button>
                </form>
              
            </Modal>
          </div>
    )
}

export default GameForm; 