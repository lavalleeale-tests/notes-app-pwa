import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Delete, Create, CancelScheduleSend } from '@material-ui/icons';
import { IconButton, TextField, Button } from '@material-ui/core';

const Note = ({ note, deleteFunc, updateFunc }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [name, setName] = useState(note.name);
  const [content, setContent] = useState(note.content);

  function onSubmit(e) {
    e.preventDefault();
    updateFunc({
      id: note.id,
      name,
      content,
    });
    setShowEditor(false);
  }
  return (
    <>
      {showEditor
        ? (
          <form onSubmit={onSubmit}>
            <IconButton aria-label="cancel" onClick={() => setShowEditor(false)} style={{ float: 'right' }}>
              <CancelScheduleSend />
            </IconButton>
            <h2>Edit Note</h2>
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
            <Button aria-label={navigator.onLine ? 'Add Note' : 'Network Offline'} disabled={!navigator.onLine} style={{ float: 'right', marginTop: '10px' }} variant="outlined" type="submit">{navigator.onLine ? 'Add' : 'Network Offline'}</Button>

          </form>
        )
        : (
          <div>
            <IconButton aria-label="Delete Note" onClick={() => deleteFunc(note.id)} style={{ float: 'right' }}>
              <Delete />
            </IconButton>
            <IconButton aria-label="Show Editor" onClick={() => setShowEditor(true)} style={{ float: 'right' }}>
              <Create />
            </IconButton>
            <h2>
              {note.name}
            </h2>
            <p>
              {note.content}
            </p>
          </div>
        )}
    </>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  deleteFunc: PropTypes.func.isRequired,
  updateFunc: PropTypes.func.isRequired,
};

export default Note;
