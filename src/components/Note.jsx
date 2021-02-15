import React from 'react';
import PropTypes from 'prop-types';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const Note = ({ note, deleteMe }) => (
  <div>
    <IconButton onClick={deleteMe} style={{ float: 'right' }}>
      <Delete />
    </IconButton>
    <h2>
      {note.name}
    </h2>
    <p>
      {note.content}
    </p>
  </div>
);

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  deleteMe: PropTypes.func.isRequired,
};

export default Note;
