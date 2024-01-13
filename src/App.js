import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import moment from 'moment';
import { MdEdit, MdDelete } from "react-icons/md";
import React, { useState, useEffect, useContext } from 'react';
import NoteContext from './NoteContext';

function App() {
  const [valueInput, setValueInput] = useState('');
  const [listeNote, setListeNote] = useState(JSON.parse(localStorage.getItem('listeNote')) || []);
  const [isEditing, setIsEditing] = useState(false);
  const [noteEditingId, setNoteEditingId] = useState('');
  const [width, setWidth] = useState('20px');
  const [height, setHeight] = useState('20px');
  const [colorBackground, setColorBackground] = useState(JSON.parse(localStorage.getItem('colorBackground')) || 'linear-gradient(90deg, #4dc9e6, #210cac)');
  const numberNote = listeNote.length;

  // Gérer le changement dans les champs de formulaire
  const handleChange = (e) => {
    setValueInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valueInput !== '') {
      let note;
      if (isEditing) {
        note = listeNote.map((noteEdit) =>
          noteEdit.id === noteEditingId
            ? {
                value: valueInput,
                date: moment().format("MM/DD/YYYY"),
                time: moment().format("HH:mm:ss"),
                isEditing: noteEditingId
              }
            : noteEdit
        );
      } else {
        note = {
          id: Math.floor(Math.random() * 10000),
          value: valueInput,
          date: moment().format("MM/DD/YYYY"),
          time: moment().format("HH:mm:ss"),
          isEditing: false
        };
        note = [...listeNote, note];
      }
      setListeNote(note);
      setIsEditing(false);
      setValueInput('');
    } else {
      alert("Entrez d'abord une note!");
    }
  };

  const handleEdit = (noteId) => {
    setIsEditing(true);
    const note = listeNote.find((note) => noteId === note.id);
    setValueInput(note.value);
    setNoteEditingId(note.id);
  };

  const handleDelete = (noteId) => {
    const note = listeNote.filter((note) => noteId !== note.id);
    setListeNote(note);
  };

  const handleDeleteAll = () => {
    setListeNote([]);
  };

  const backgroundContainer = (backgroundImage) => {
    setColorBackground(backgroundImage);
    setWidth("25px");
    setHeight("25px");
  };

  useEffect(() => {
    localStorage.setItem('listeNote', JSON.stringify(listeNote));
    localStorage.setItem('colorBackground', JSON.stringify(colorBackground));
  }, [listeNote, colorBackground]);

  const contextValue = {
    height: height,
    width: width,
    backgroundContainer: backgroundContainer,
    value: valueInput,
    onChange: handleChange,
    onSubmit: handleSubmit,
    isEditing: isEditing,
    listeNote: listeNote,
    handleEdit: handleEdit,
    handleDelete: handleDelete,
    handleDeleteAll: handleDeleteAll,
    numberNote: numberNote
  };

  return (
    <NoteContext.Provider value={contextValue}>
      <div className="container-fluid pt-3 pb-5 min-vh-100" style={{ backgroundImage: colorBackground }}>
        <BackgroundColor />
        <Form type='text' placeholder='add' />
        <ContainerNotes />
      </div>
    </NoteContext.Provider>
  );
}

const BackgroundColor = () => {
  const { backgroundContainer, height, width } = useContext(NoteContext);

  return (
    <div className='container mb-5' style={{ backgroundColor: '#fff', borderRadius: '5px' }}>
      <div className='row'>
        <div className='col-12 col-md-6 align-items-center py-3 d-flex'>
          <h3>NoteHack</h3>
        </div>
        <div className='col-12 col-md-6 justify-content-end align-items-center py-3 d-flex' >
          <Palette width={width} height={height} backgroundImage='linear-gradient(90deg, #4dc9e6, #210cac)' onClick={() => backgroundContainer('linear-gradient(90deg, #4dc9e6, #210cac)')} />
          <Palette width={width} height={height} backgroundImage='linear-gradient(180deg, #a9c9ff, #ffbbec)' onClick={() => backgroundContainer('linear-gradient(180deg, #a9c9ff, #ffbbec)')} />
          <Palette width={width} height={height} backgroundImage='linear-gradient(45deg, #fa8bff, #2bd2ff 52%, #2bff88 90%)' onClick={() => backgroundContainer('linear-gradient(45deg, #fa8bff, #2bd2ff 52%, #2bff88 90%)')} />
          <Palette width={width} height={height} backgroundImage='linear-gradient(to bottom right, #ff512f, #dd2476)' onClick={() => backgroundContainer('linear-gradient(to bottom right, #ff512f, #dd2476)')} />
          <Palette width={width} height={height} backgroundImage='linear-gradient(to bottom right, #fd8451, #ffbd6f)' onClick={() => backgroundContainer('linear-gradient(to bottom right, #fd8451, #ffbd6f)')} />
          <Palette width={width} height={height} backgroundImage='linear-gradient(45deg, #85ffbd, #fffb7d)' onClick={() => backgroundContainer('linear-gradient(45deg, #85ffbd, #fffb7d)')} />
        </div>
      </div>
    </div>
  );
}

const Palette = ({ backgroundImage, onClick, height, width }) => {
  return (
    <button onClick={onClick} style={{ border: 'none', width: width, height: height, borderRadius: '50%', marginLeft: '15px', backgroundImage: backgroundImage }}></button>
  );
}

const Form = ({ placeholder, type }) => {
  const { value, onChange, onSubmit, isEditing } = useContext(NoteContext);

  return (
    <form className='container mt-5 py-3' style={{ backgroundColor: '#fff', borderRadius: '5px' }} onSubmit={onSubmit}>
      <div className='row'>
        <div className='col-12 col-md-11'>
          <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
        <div className='col-12 col-md-1 text-end'>
          <button className='btn btn-success px-3'>
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  );
}

const Input = ({ placeholder, type }) => {
  const { value, onChange } = useContext(NoteContext);

  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className='form-control' />
  );
}

const ContainerNotes = () => {
  const { listeNote, handleEdit, handleDelete, handleDeleteAll, numberNote } = useContext(NoteContext);

  return (
    <>
      <div className='container' style={{ backgroundColor: '#fff', borderRadius: '5px' }}>
        <EnteteNotes handleDeleteAll={handleDeleteAll} numberNote={numberNote} />
        <div className='row mt-4 p-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <Notes listeNote={listeNote} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}

const EnteteNotes = ({ handleDeleteAll, numberNote }) => {
  return (
    <div className='row mt-5 pt-4'>
      <div className="col-12 col-md-6 d-flex">
        <h5>Notes</h5>
        <div className='ms-2 d-flex justify-content-center' style={{ backgroundColor: '#e5e5e5', width: '20px', height: '25px', borderRadius: '50%' }}>{numberNote}</div>
      </div>
      <div className="col-12 col-md-6 text-end">
        <button onClick={() => handleDeleteAll()} className='btn btn-primary'>Clear all</button>
      </div>
    </div>
  );
}

const Notes = () => {
  const { listeNote, handleEdit, handleDelete } = useContext(NoteContext);

  return (
    listeNote.map((note) => (
      <div className='col-md-4'>
        <div className="card mb-4" style={{ borderLeft: "5px solid blue", borderRadius: "10px" }}>
          <div className="card-body">
            <div className='row'>
              <div className='col-12 col-md-6'>
                <p>{note.value}</p>
              </div>
              <div className='col-12 col-md-6 text-end'>
                <Button className='' onClick={() => handleEdit(note.id)} icone={<MdEdit />} color='blue' />
                <Button className='border-btn' onClick={() => handleDelete(note.id)} icone={<MdDelete />} color='red' />
              </div>
              <div className='col-12'>
                <p>{note.time} {note.date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}

const Button = ({ className, onClick, icone, color }) => {
  return (
    <button className={className} onClick={onClick} style={{ border: 'none', background: 'none', fontSize: '20px', color: color }}>
      {icone}
    </button>
  );
}

export default App;
