import {useState} from 'react';

const AddNote = ({handleAddNote}) => {
    const [noteText,setNoteText] = useState('');
    const characterLimit = 200;

    const handleChange = (event) => {
        if(characterLimit- event.target.value.length >= 0){
        setNoteText(event.target.value);
        }
    }
    const handleSaveClick = () => {
        if(noteText.trim().length>0){
        handleAddNote(noteText);
        setNoteText(''); // and resets the textarea input
        }
    }
    // here we want the state to be updated with the new note 
// but the state is in app.js so the child does
//  not know how to update the state hence we pass a func in appjs then pass it down components

    return(<div className = "note new">
            <textarea 
            rows='8' 
            cols = '10' 
            placeholder = 'type to add a note'
            value = {noteText}
            onChange = {handleChange}
            ></textarea>
            <div className = "note-footer">
                <small> {characterLimit- noteText.length} Remaining</small>
                <button className = 'save' onClick = {handleSaveClick}> SAVE </button>
            </div>
    </div>)
} 

export default AddNote;