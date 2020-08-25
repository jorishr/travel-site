import React from 'react';
import { useState} from 'react';

export default function ReactSection(props){
    const { text } = props; 
    const [ state, setState ] = useState({value: 'nld'});

    function updateLang(){
        setState({value: event.target.value});
    }

    return (
        <>
            <p>{ text[state.value] }</p>
            <select defaultValue="nld" onChange={ (e) => updateLang(e) }>
                <option value="nld">Nederlands</option>
                <option value="esp">Español</option>
                <option value="cat">Català</option>
                <option value="eng">English</option>
            </select>
        </>
    )
}