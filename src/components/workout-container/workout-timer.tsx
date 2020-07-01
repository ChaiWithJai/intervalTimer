import {addSeconds, differenceInSeconds} from 'date-fns';
import React, {useState, useEffect} from 'react';
import {IFormState as IWorkoutDetailsProps} from './workout-details';

interface IInterval {
    count: number,
    isRest: boolean
}

interface ITimer {
    timeLeft: number;
    timeOver: Date;
}

const WorkoutTimer: React.FC<IWorkoutDetailsProps> = ({numberOfSets, roundDuration, restDuration, endOfRoundWarning}) => {
    const [{count, isRest}, setCurrentInterval] = useState<IInterval>({count: 1, isRest: false});
    const [{timeLeft, timeOver}, setTimer] = useState<ITimer>({timeLeft: Number(roundDuration), timeOver: addSeconds(new Date(), Number(roundDuration))});

    const nextInterval = () => {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Lets get it"))
        setCurrentInterval({isRest: false, count: count+1});
        setTimer({timeLeft: Number(roundDuration), timeOver: addSeconds(new Date(), Number(roundDuration))})
    }

    const restInterval = () => {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Take that break, champ"));
        setTimer({timeLeft: Number(restDuration), timeOver: addSeconds(new Date(), Number(restDuration))});
        setCurrentInterval({count, isRest: true});
    }
    useEffect(() => {
        const interval = setInterval(() => setTimer({timeOver, timeLeft: differenceInSeconds(timeOver, new Date())}), 500);
        if (timeLeft <= 0) {
            isRest ? nextInterval() : restInterval();
            clearInterval(interval);
            return;
        }
        return () => clearInterval(interval);
    }, [timeLeft, isRest, timeOver]);
    
    return (
        <>
            <h1>{timeLeft}</h1>
            <p>Current Round:  {count}</p>
            <p>{isRest ? 'Rest up!' : `Let's get it!`}</p>
        </>
    );
};

export default WorkoutTimer;