import {addSeconds, differenceInSeconds} from 'date-fns';
import React, {useState, useEffect} from 'react';
import {IFormState as IWorkoutDetailsProps} from './workout-details';
import dict from '../../dictionary/en';

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

const CONGRATS_GIPHY_URL = "https://media3.giphy.com/media/dkGhBWE3SyzXW/giphy.gif";

type allProps = IProps & IWorkoutDetailsProps;

const WorkoutTimer: React.FC<allProps> = ({handleReset, numberOfSets, roundDuration, restDuration, endOfRoundWarning, warmUp, coolDown}) => {
    const [{count, isRest, isPaused}, setCurrentInterval] = useState<IInterval>({count: 1, isRest: false, isPaused: false});
    const [{timeLeft, timeOver}, setTimer] = useState<ITimer>({timeLeft: Number(roundDuration), timeOver: addSeconds(new Date(), Number(roundDuration))});
    const [isComplete, setIsComplete] = useState(false);

    const speech = window.speechSynthesis;
    const speak = (message: string) => {
        const utterance = new SpeechSynthesisUtterance(message);
        speech.speak(utterance);
    }

    const nextInterval = () => {
        speak(dict["timer.go"]);
        setCurrentInterval({isPaused, isRest: false, count: count+1});
        setTimer({timeLeft: Number(roundDuration), timeOver: addSeconds(new Date(), Number(roundDuration))})
    }

    const restInterval = () => {
        speak(dict["timer.break"]);
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
        else if (timeLeft === Number(endOfRoundWarning) && !isRest) speak(dict["timer.warning"]);
        else if (isPaused) clearInterval(interval);
        
        return () => clearInterval(interval);
    }, [timeLeft, isRest, timeOver, isPaused, nextInterval, restInterval]);
    
    return (
        <>
            {!isComplete ? 
            <>
                <h1>{timeLeft}</h1>
                <p>{dict["timer.currentRound"]}{count}</p>
                <p>{isRest ? dict["timer.rest"] : dict["timer.go"]}</p>
                <button onClick={handlePause}>{!isPaused ? dict["timer.pause"] : dict["timer.go"]}</button>
                <button onClick={handleReset}>{dict["timer.reset"]}</button>
            </>
            :
            <img src={CONGRATS_GIPHY_URL} />
            }
        </>
    );
};

export default WorkoutTimer;