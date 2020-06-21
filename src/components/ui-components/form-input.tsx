import React from 'react';
import './form-input.css';

interface IProps {
    name: string;
    label: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    type?: "input" | "select";
    options?: string[];
    min?: string;
}

const FormInput: React.FC<IProps> = ({name, label, min, type, options, value, onChange}) => (
    <>
        <label>{label}</label>
        {type === 'select' ?
        <select name={name} value={value} onChange={onChange}>
            {options?.map((option, idx) => {
                return <option key={`option-${idx}`} value={option}>{option}</option>
            })}
        </select> :
        <input name={name} type="number" min={min ? min : 1} value={value} onChange={onChange}  />
        }
    </>
)

export default FormInput;