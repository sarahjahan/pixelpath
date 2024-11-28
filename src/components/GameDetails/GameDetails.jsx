import './GameDetails.scss'
import Select from 'react-select';
import { useState } from 'react'
import axios from "axios";
import Creatable from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';

const BASE_URL = import.meta.env.VITE_API_URL;

function GameDetails({gameDetails}) {
    // const [isClearable, setIsClearable] = useState(true);
    // const [isSearchable, setIsSearchable] = useState(true);
    

    const {title, coverArt, notes, rating, status, summary, tags = [], id} = gameDetails;
    const statusClass = (status || 'default').toLowerCase().replace(/\s+/g, '') || 'default-status';

    console.log('Game Details:', gameDetails);
    console.log('Status:', status);



    function adjustCoverArtUrl(url, size = 't_cover_big') {
        if (!url) return '';
        const imageIdMatch = url.match(/\/t_([a-zA-Z0-9_]+)\/([a-zA-Z0-9]+)\.jpg/);
        if (!imageIdMatch) return url; 
        const imageId = imageIdMatch[2];
        return `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.jpg`;
      }
    
      // const originalUrl = "//images.igdb.com/igdb/image/upload/t_thumb/co6x5r.jpg";
      // const newUrl = adjustCoverArtUrl(originalUrl, 't_cover_big'); // Replacing 't_thumb' with 't_cover_big'
    
      const newUrl = adjustCoverArtUrl(coverArt,'t_cover_big')

      // console.log('Tags:', tags);
      // const tagOptions = Array.isArray(gameDetails.tags)
      // ? gameDetails.tags.map(tag => ({
      //     label: tag,
      //     value: tag.toLowerCase().replace(/\s+/g, "_") // Create a value for react-select
      // }))
      // : [];


      // const handleTagCreation = async (selectedTags) => {
      //   const newTag = selectedTags[selectedTags.length - 1]; // get most recently selected or created tag
    
      //   if (!newTag || newTag.value === "") return; // checks if the tag is empty or invalid
    
      //   try {
      //     const response = await axios.post(`${BASE_URL}/api/tags/`, {
      //       tagName: newTag.label, // Send the tag's label (name) to the backend
      //       gameId: gameDetails.id, 
       
      //     });
    
      //     if (response.ok) {
      //       // Optionally, you can update the tags state here if you want to immediately reflect the added tag
      //       console.log("Tag created successfully");
      //     } else {
      //       console.error("Failed to add tag:", response.data.message)
      //       console.log(response.data.message);
      //     }
      //   } catch (error) {
      //     console.error("Error creating tag:", error);
      //   }
      // };

    return(
        <div className='game'>
            <div className="game__main-details">
                <h1 className="game__header">Game Details</h1>
                <h2 className="game__title">{title}</h2>
                <img className="game__coverart" src={newUrl}/>
                <p className="game__summary">{summary}</p>
            </div>


            <div className="game__sub-details">
              <label className="label-text">
                Status:
                <p className={`card__subtitle--${statusClass}`}>{status}</p>
              </label>
              <label className="label-text">
                Related Tags:
                {tags.length === 0 ? (
                  <p className="result-message">No tags found.</p>
                ) : (
                  tags.map((tag, index) => (
                    <p className="card__subtitle"key={index}>{tag}</p> //add tag classes eventually
                ))
                )}
              </label>
                {/* <CreatableSelect 
                className="gamesList__tags"
                isMulti
                isSearchable={isSearchable}
                isClearable={isClearable}
                name="tags"
                options={tagOptions} 
                placeholder={"Add your own tags..."}
                onChange={handleTagCreation}/> */}

              <label className="label-text">
                Notes:
                  <p className="card__subtitle">{notes}</p>
              </label>
              <label className="label-text">
                My Rating: 
                <p className="card__subtitle">{rating}</p>
              </label>

            </div>
        </div>
    )
}

export default GameDetails;