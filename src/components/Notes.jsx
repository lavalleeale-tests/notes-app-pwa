import React, { useState } from 'react';
import { Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Note from './Note';

const useStyles = makeStyles({
  card: {
    margin: 'auto',
    'margin-top': '10px',
    'margin-bottom': '10px',
    maxWidth: 500,
    padding: '10px',
  },
});

function Notes() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch('https://api.alextesting.ninja/notesApp/addNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        content,
      }),
    });
    const json = await res.json();
    if (JSON.stringify(json) !== JSON.stringify(notes)) {
      setNotes(json);
    }
  }
  async function getNotes() {
    const res = await fetch('https://api.alextesting.ninja/notesApp/getNotes', {
      method: 'GET',
    });
    const json = await res.json();
    if (JSON.stringify(json) !== JSON.stringify(notes)) {
      setNotes(json);
    }
  }
  async function deleteNote(id) {
    const res = await fetch('https://api.alextesting.ninja/notesApp/deleteNote', {
      method: 'DELETE',
      headers: {
        id,
      },
    });
    const json = await res.json();
    if (JSON.stringify(json) !== JSON.stringify(notes)) {
      setNotes(json);
    }
  }
  getNotes();
  return (
    <>
      <Card className={classes.card}>
        <h2>New Note</h2>
        <form onSubmit={onSubmit}>
          <TextField
            required
            style={{ width: '100%' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Title"
            variant="outlined"
            id="Title"
          />
          <TextField
            required
            style={{ width: '100%', marginTop: '10px' }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            label="Content"
            variant="outlined"
            id="Content"
          />
          <Button disabled={!navigator.onLine} style={{ float: 'right', marginTop: '10px' }} variant="outlined" type="submit">{navigator.onLine ? 'Add' : 'Network Offline'}</Button>

        </form>
      </Card>
      {notes.map((note, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li style={{ listStyleType: 'none' }} key={index}>
          <Card className={classes.card}>
            <Note note={note} deleteMe={() => deleteNote(note.id)} />
          </Card>
        </li>
      ))}
    </>
  );
}

export default Notes;
