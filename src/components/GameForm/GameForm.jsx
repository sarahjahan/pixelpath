import "./GameForm.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Select from "react-select";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "30rem",
  },
};

function GameForm({ gameid, getGamesLibrary, game, modalIsOpen, closeModal }) {
  const [removedTags, setRemovedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [originalTags, setOriginalTags] = useState(
    (game.tags || []).map((tag) => ({
      id: tag.id,
      name: tag.name,
    }))
  );
  const [tags, setTags] = useState(originalTags);
  const [gameDetails, setGameDetails] = useState({
    title: game.title,
    status: game.status || "",
    notes: game.notes || "",
    rating: game.rating || null,
  });

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/tags`);
        setTagOptions(
          data.map((tag) => ({ label: tag.name, value: tag.name, id: tag.id }))
        );
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    getTags();

    setGameDetails({
      title: game.title,
      status: game.status || "",
      notes: game.notes || "",
      rating: game.rating || null,
    });
    setOriginalTags(
      (game.tags || []).map((tag) => ({
        id: tag.id,
        name: tag.name,
      }))
    );
    setTags(
      (game.tags || []).map((tag) => ({
        id: tag.id,
        name: tag.name,
      }))
    );
  }, [game]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedTags = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));
    try {
      const { data } = await axios.put(`${BASE_URL}/api/games/${gameid}`, {
        ...gameDetails,
        tags: sanitizedTags,
        removedTags,
      });
      toast.success(
        `${game.title} was sucessfully updated. Refreshing Games list.`
      );
      closeModal();
      getGamesLibrary();
    } catch (error) {
      toast.error(
        `Error updating ${game.title}, ensure all fields are completed.`,
        error
      );
      console.log(error.response?.data?.message || error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleTagChange = (selectedTags) => {
    const updatedTags = selectedTags.map((tag) => ({
      id: tag.id || null,
      name: tag.label || tag.value,
    }));
    const removedTags = originalTags.filter(
      (tag) => !updatedTags.some((updatedTag) => updatedTag.id === tag.id)
    );

    setTags(updatedTags);
    setRemovedTags(removedTags);
  };

  return (
    <div>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById("root")}
      >
        <h2 className="modal__heading">Edit {gameDetails.title}</h2>

        <div className="modal__content">
          <form className="form__field " onSubmit={handleSubmit}>
            <label>
              Status: <br />
              <input
                type="radio"
                id="Want To Play"
                name="status"
                value="Want To Play"
                checked={gameDetails.status === "Want To Play"}
                onChange={handleInputChange}
              />
              <label htmlFor="Want To Play">
                {" "}
                Want to Play
                <br />
              </label>
              <input
                type="radio"
                id="playing"
                name="status"
                value="Playing"
                checked={gameDetails.status === "Playing"}
                onChange={handleInputChange}
              />
              <label htmlFor="playing">
                {" "}
                Playing
                <br />
              </label>
              <input
                type="radio"
                id="completed"
                name="status"
                value="Completed"
                checked={gameDetails.status === "Completed"}
                onChange={handleInputChange}
              />
              <label htmlFor="completed">
                {" "}
                Completed
                <br />
              </label>
            </label>
            <label>
              {" "}
              Rating:
              <input
                className="form__textarea"
                type="number"
                min="1"
                max="5"
                name="rating"
                value={gameDetails.rating}
                placeholder={"Add a personal rating..."}
                onChange={handleInputChange}
              />
            </label>
            <label>
              {" "}
              Notes:
              <input
                className="form__textarea"
                type="text"
                name="notes"
                value={gameDetails.notes}
                placeholder={"Add your own notes..."}
                onChange={handleInputChange}
              />
            </label>
            <label>
              {" "}
              Tags:
              <Select
                className="form__tags"
                isMulti
                name="tags"
                options={tagOptions}
                placeholder={"Add your own tags..."}
                value={
                  tags.length > 0
                    ? tags.map((tag) => ({
                        label: tag.name,
                        value: tag.name,
                        id: tag.id,
                      }))
                    : null
                }
                onChange={handleTagChange}
              />
            </label>

            <div className="button__container">
              <button className="button" type="submit">
                Save
              </button>
              <button className="button" onClick={closeModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default GameForm;
