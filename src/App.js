import {useState,useEffect} from 'react';
import {nanoid} from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
const App = () => {
  const [notes,setNotes] = useState([ /*here notes is the main array notelist */
    {
      id:nanoid(),
      text : "my first note",
      date: "11/11/2021"
    },
    {
      id:nanoid(),
      text : "my second note",
      date: "10/11/2021"
    },{
      id:nanoid(),
      text : "my first note",
      date: "12/11/2021"
    }
  ]);

  const [searchText,setSearchText] = useState('');

  const[darkMode,setDarkMode] = useState(false);

  useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);
  
  useEffect(() => {
    localStorage.setItem (
      'react-notes-app-data',JSON.stringify(notes)
      );
  }, [notes])

// this add note func has been passed down notes list and into add 
//  note this is called prop drilling we could also us econtext api
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text:text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes,newNote]; /*new array created with new note added */
    setNotes(newNotes);/*here we use statefunc since the list has changed or the state has changed the the hook will rerender */
  };
  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !==id); 
    setNotes(newNotes);/** used to render the changes , 
    here also we pass the functn down the tree */
    // we use filter o notes array t remove the  
  }
  // we will pass this to the notes list down to the children

  

    return  (
      <div className = {`${darkMode && 'dark-mode '}`}>
        <div className="container">
      <Header handleToggleDarkMode={setDarkMode} />
      <Search handleSearchNote = { setSearchText }/>
      <NotesList notes = {notes.filter((note)=> 
      note.text.toLowerCase().includes(searchText)
      )}  
      handleAddNote = {addNote}
      handleDeleteNote = {deleteNote}
      />
    </div>
      </div>
    );
};

export default App;