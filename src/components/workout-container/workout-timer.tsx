import {addSeconds, differenceInSeconds} from 'date-fns';
import React, {useState, useEffect} from 'react';
import {IFormState as IWorkoutDetailsProps} from './workout-details';

interface IInterval {
    count: number,
    isRest: boolean,
    isPaused: boolean,
}

interface ITimer {
    timeLeft: number;
    timeOver: Date;
}

interface IProps {
    handleReset: () => void;
}

type allProps = IProps & IWorkoutDetailsProps;

const WorkoutTimer: React.FC<allProps> = ({handleReset, numberOfSets, roundDuration, restDuration, endOfRoundWarning}) => {
    const [{count, isRest, isPaused}, setCurrentInterval] = useState<IInterval>({count: 1, isRest: false, isPaused: false});
    const [{timeLeft, timeOver}, setTimer] = useState<ITimer>({timeLeft: Number(roundDuration), timeOver: addSeconds(new Date(), Number(roundDuration))});
    const[isComplete, setIsComplete] = useState(false);

    const speech = window.speechSynthesis;
    const speak = (message: string) => {
        const utterance = new SpeechSynthesisUtterance(message);
        speech.speak(utterance);
    }

    const nextInterval = () => {
        speak("Lets get it");
        setCurrentInterval({isPaused, isRest: false, count: count+1});
        setTimer({timeLeft: Number(roundDuration), timeOver: addSeconds(new Date(), Number(roundDuration))})
    }

    const restInterval = () => {
        speak("Take that break, champ");
        setTimer({timeLeft: Number(restDuration), timeOver: addSeconds(new Date(), Number(restDuration))});
        setCurrentInterval({isPaused, count, isRest: true});
    }

    const handlePause = () => {
        setCurrentInterval({isRest, count, isPaused: !isPaused});
        if (isPaused) setTimer({timeLeft, timeOver: addSeconds(new Date(), Number(timeLeft))})
    }

    useEffect(() => {
        const interval = setInterval(() => setTimer({timeOver, timeLeft: differenceInSeconds(timeOver, new Date())}), 200);
        
        if (Number(numberOfSets) < count) setIsComplete(true);
        else if (timeLeft <= 0) isRest ? nextInterval() : restInterval();
        else if (timeLeft === Number(endOfRoundWarning) && !isRest) speak("Finish up strong, champ!");
        else if (isPaused) clearInterval(interval);
        
        return () => clearInterval(interval);
    }, [timeLeft, isRest, timeOver, isPaused, nextInterval, restInterval]);
    
    return (
        <>
            {!isComplete ? 
            <>
                <h1>{timeLeft}</h1>
                <p>Current Round:  {count}</p>
                <p>{isRest ? 'Rest up!' : `Let's get it!`}</p>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleReset}>Reset</button>
            </>
            :
            <img src="https://media3.giphy.com/media/dkGhBWE3SyzXW/giphy.gif?cid=ecf05e4731236f87a709d266c8816fae59c14691cbf4c642&rid=giphy.gif" />
            }
        </>
    );
};

export default WorkoutTimer;