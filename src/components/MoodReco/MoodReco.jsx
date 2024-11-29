import './MoodReco.scss'
import angry from '../../public/assets/angry.png'
import bored from '../../public/assets/bored.png'
import cool from '../../public/assets/cool.png'
import happy from '../../public/assets/happy.png'
import { useState } from 'react';


function MoodReco() {
    const [ selectedMood, setSelectedMood ] = useState(null)
    

    return (
        <div className="moods">
            <h2>How are you feeling?</h2>
            <div className="moods__container">
                <div className={`image__container`}>
                    <img className="Relaxed" src={cool} onClick={() => setSelectedMood()}/>
                </div>
                <div className="image__container">
                    <img className="Adventurous" src={happy} onClick={() => setSelectedMood()}/>
                </div>
                <div className="image__container">
                    <img className="Competitive" src={angry} onClick={() => setSelectedMood()}/>
                </div>
            </div>
        </div>
    )}

export default MoodReco;