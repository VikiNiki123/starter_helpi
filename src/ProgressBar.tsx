import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './ProgressBar.css';
import catSleep from './images/CISC-progress-cat-sleep.png';
import catWakeUp from './images/CISC-progress-cat-wakeUp.png';
import catYawn from './images/CISC-progress-cat-yawn.png';
import catWalk from './images/CISC-progress-cat-walking.gif';
import catFight from './images/CISC-progress-cat-fight.gif';
import catEat from './images/CISC-progress-cat-eat.gif';
import mouse from './images/CISC-progress-mouse-eat.gif';


interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({progress}) => {
  const [currentProgress, setCurrentProgress] = useState(progress);
  const showMouse = currentProgress < 84; // Show mouse when progress is less than 84%
  let imageSrc: string;

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  if (currentProgress === 0) {
    imageSrc = catSleep;
  } else if (currentProgress >= 1 && currentProgress <= 13) {
    imageSrc = catWakeUp;
  } else if (currentProgress >= 14 && currentProgress <= 28) {
    imageSrc = catYawn;
  } else if (currentProgress >= 29 && currentProgress <= 83) {
    imageSrc = catWalk;
  } else if (currentProgress >= 84 && currentProgress <= 95) {
    imageSrc = catFight;
  } else if (currentProgress >= 96 && currentProgress <= 100) {
    imageSrc = catEat;
  } else {
    imageSrc = catEat; // Default image if progress is out of range
  }

  return (
    <div className="progress-container">
            <img
                src={imageSrc}
                alt="Progress-cat"
                className="progress-asset-cat"
                style={{width: `(${currentProgress}%)`}}
            ></img>

            {showMouse && (
                <img
                    src={mouse}
                    alt="Mouse"
                    className="progress-asset-mouse"
                />
            )}

        <div className="progress-cat">
            <div 
                className="progress-bar-cat" 
                role="progressbar" 
                aria-valuenow= {currentProgress}
                aria-valuemin= {0} 
                aria-valuemax= {101} 
                style={{ width: `${currentProgress}%` }}
            >
            <img
            /*
                src={imageSrc}
                alt="Progress-cat"
                className="progress-asset-cat"
                style={{transform: `translateX(${currentProgress}%)`}}
            */
            ></img>

            </div>
        </div>
    </div>
  );
};

export default ProgressBar;
            
