import React, {useState} from 'react';
import FormInput from '../ui-components/form-input';
import './workout-details.css'

interface IFormState {
    numberOfSets: string;
    roundDuration: string;
    restDuration: string;
    endOfRoundWarning: string | undefined;
}

const WorkoutDetails: React.FC = () => {
    const initialState: IFormState = {
        numberOfSets: "1",
        roundDuration: "60",
        restDuration: "30",
        endOfRoundWarning: undefined,
    };
    const [form, setForm] = useState<IFormState>(initialState);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name ?? e.currentTarget.name
        const value =  e.target.value ?? e.currentTarget.value;
        setForm({...form, [name]: value});
    };

    const handleOnSubmit = (e: React.FormEvent) => e.preventDefault();

    const {numberOfSets, roundDuration, restDuration, endOfRoundWarning} = form;
    
    return (
        <form className="workoutDetailsContainer" onSubmit={handleOnSubmit}>
            <h1>Workout Interval Details</h1>
            <FormInput name="numberOfSets" label="Number of Sets" value={numberOfSets} onChange={handleOnChange} />
            <FormInput name="roundDuration" label="Round Duration (in seconds)" value={roundDuration} onChange={handleOnChange} />
            <FormInput name="restDuration" label="Rest Duration (in seconds)" min="0" value={restDuration} onChange={handleOnChange} />
            <FormInput name="endOfRoundWarning" label="End of Round Warning (in seconds)" type="select" options={["", "10","30"]} value={endOfRoundWarning} onChange={handleOnChange} />
            <input type="submit" value="Start Workout" />
        </form>
    )
}

export default WorkoutDetails;