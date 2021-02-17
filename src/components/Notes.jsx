import React, { useState } from "react";
import { Card, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Note from "./Note";

const useStyles = makeStyles({
  card: {
    margin: "auto",
    "margin-top": "10px",
    "margin-bottom": "10px",
    maxWidth: 500,
    padding: "10px",
  },
});

function Notes() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [shouldLogin, setShouldLogin] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setName("");
    setContent("");
    const res = await fetch("https://alextesting.ninja/notesApp/addNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    const res = await fetch("https://alextesting.ninja/notesApp/getNotes", {
      method: "GET",
    });
    if (res.ok) {
      const json = await res.json();
      if (JSON.stringify(json) !== JSON.stringify(notes)) {
        setNotes(json);
      }
    } else if (navigator.onLine) {
      setShouldLogin(true);
    }
  }
  async function deleteNote(id) {
    const res = await fetch("https://alextesting.ninja/notesApp/deleteNote", {
      method: "DELETE",
      headers: {
        id,
      },
    });
    const json = await res.json();
    if (JSON.stringify(json) !== JSON.stringify(notes)) {
      setNotes(json);
    }
  }
  if (!notes.length) {
    getNotes();
  }
  async function updateNote(note) {
    const res = await fetch("https://alextesting.ninja/notesApp/updateNote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: note.id,
        name: note.name,
        content: note.content,
      }),
    });
    const json = await res.json();
    if (JSON.stringify(json) !== JSON.stringify(notes)) {
      setNotes(json);
    }
  }
  if (!notes.length) {
    getNotes();
  }
  return (
    <>
      {shouldLogin && <Redirect to="/login" push />}
      <Card className={classes.card}>
        <h2>New Note</h2>
        <form onSubmit={onSubmit}>
          <TextField
            required
            style={{ width: "100%" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Title"
            variant="outlined"
            id="Title"
          />
          <TextField
            required
            style={{ width: "100%", marginTop: "10px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            label="Content"
            variant="outlined"
            id="Content"
          />
          <Button
            aria-label={navigator.onLine ? "Add" : "Network Offline"}
            disabled={!navigator.onLine}
            style={{ float: "right", marginTop: "10px" }}
            variant="outlined"
            type="submit"
          >
            {navigator.onLine ? "Add" : "Network Offline"}
          </Button>
        </form>
      </Card>
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {notes.map((note) => (
          <li key={note.id}>
            <Card className={classes.card}>
              <Note
                note={note}
                deleteFunc={(id) => deleteNote(id)}
                updateFunc={(newNote) => updateNote(newNote)}
              />
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Notes;
