import './MoodReco.scss'
import angry from '../../public/assets/angry.png'
import chill from '../../public/assets/chill.png'
import cool from '../../public/assets/cool.png'
import happy from '../../public/assets/happy.png'
import { useState } from 'react';


function MoodReco({setMoodFilter, selectedMood, setSelectedMood}) {
    
    const handleMoodClick = (mood) => {
        setMoodFilter(mood); // Pass selected mood to GamesLibrary
        setSelectedMood(mood);
      };
    
    

    return (
        <div className="moods">
            <h2>How are you feeling?</h2>
            <p className="tag-text">choose a game below based on your current mood</p>
            <div className="moods__container">
                <div className={`image__container ${selectedMood !== 'relaxed' ? 'unselected' : ''}`}>
                    <img className="Relaxed" src={chill} onClick={() => handleMoodClick('relaxed')}/>
                    <p className="tag-text">Relaxed</p>
                </div>
                <div className={`image__container ${selectedMood !== 'happy' ? 'unselected' : ''}`}>
                    <img className="Adventurous" src={happy} onClick={() => handleMoodClick('happy')}/>
                    <p className="tag-text">Happy</p>
                </div>
                <div className={`image__container ${selectedMood !== 'competitive' ? 'unselected' : ''}`}>
                    <img className="Competitive" src={angry} onClick={() => handleMoodClick('competitive')}/>
                    <p className="tag-text">Competitive</p>

                </div>
            </div>
        </div>
    )}

export default MoodReco;