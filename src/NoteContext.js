import React from "react";

const NoteContext = React.createContext({
  height: '',
  width: '',
  backgroundContainer: () => { },
  value: '',
  onChange: () => { },
  onSubmit: () => { },
  isEditing: false,
  listeNote: [],
  handleEdit: () => { },
  handleDelete: () => { },
  handleDeleteAll: () => { },
  numberNote: 0
});

export default NoteContext;
