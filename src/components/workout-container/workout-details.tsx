import React, {useState} from 'react';
import FormInput from '../ui-components/form-input';
import WorkoutTimer from './workout-timer';
import './workout-details.css'
import dict from '../../dictionary/en';

export interface IFormState {
    numberOfSets: string;
    roundDuration: string;
    restDuration: string;
    endOfRoundWarning: string | undefined;
    warmUp: string;
    coolDown: string;
}

const WorkoutDetails: React.FC = () => {
    const initialState: IFormState = {
        numberOfSets: "1",
        roundDuration: "60",
        restDuration: "30",
        endOfRoundWarning: undefined,
        warmUp: "0",
        coolDown: "0"
    };
    const [form, setForm] = useState<IFormState>(initialState);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name ?? e.currentTarget.name
        const value =  e.target.value ?? e.currentTarget.value;
        setForm({...form, [name]: value});
    };

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsStarted(true);
    }

    const handleReset = () => setIsStarted(false);

    const {numberOfSets, roundDuration, restDuration, endOfRoundWarning, warmUp, coolDown} = form;
    
    return (
        <>
            <form className="workoutDetailsContainer" onSubmit={handleOnSubmit}>
                <h1>{dict["form.header"]}</h1>
                <FormInput name="numberOfSets" label="Number of Sets" value={numberOfSets} onChange={handleOnChange} />
                <FormInput name="roundDuration" label="Round Duration (in seconds)" value={roundDuration} onChange={handleOnChange} />
                <FormInput name="restDuration" label="Rest Duration (in seconds)" min="0" value={restDuration} onChange={handleOnChange} />
                <FormInput name="warmUp" label="Warm Up" min="0" value={warmUp} onChange={handleOnChange} />
                <FormInput name="coolDown" label="Cool Down" min="0" value={coolDown} onChange={handleOnChange} />
                <FormInput name="endOfRoundWarning" label="End of Round Warning (in seconds)" type="select" options={["", "10","30"]} value={endOfRoundWarning} onChange={handleOnChange} />
                <input type="submit" value="Start Workout" />
            </form>
            {isStarted && <WorkoutTimer warmUp={warmUp} coolDown={coolDown} numberOfSets={numberOfSets} roundDuration={roundDuration} restDuration={restDuration} endOfRoundWarning={endOfRoundWarning} handleReset={handleReset} />}
        </>
    )
}

export default WorkoutDetails;