import React from 'react';

export default function ReactSection(props){
    return (
        <>
            <p>Hello Traveller, this section is rendered by React. Please choose your preferred language.</p>
            <select>
                <option>Nederlands</option>
                <option>Español</option>
                <option>Català</option>
                <option>English</option>
            </select>
        </>
    )
}