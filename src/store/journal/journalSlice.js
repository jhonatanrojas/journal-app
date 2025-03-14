import { createSlice } from "@reduxjs/toolkit";
export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    activeNote: {
      id: "",
      title: "",
      body: "",
      date: 0,
      imageUrls: [],
    },
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },

    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.activeNote = action.payload;
      state.messageSaved = "";
      state.isSaving = false;
    },

    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },

    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });

      state.messageSaved = `${action.payload.title} actualizada correctamente`;
      state.activeNote = action.payload;
    },

    setPhotosToActiveNote: (state, action) => {
      state.activeNote.imageUrls = [
        ...state.activeNote.imageUrls,
        ...action.payload,
      ];
      state.isSaving = false;
    },

    clearNotesLogout: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
      state.activeNote = {
        id: "",
        title: "",
        body: "",
        date: 0,
        imageUrls: [],
      };
    },

    deleteNoteById: (state, action) => {
      state.activeNote = {
        id: "",
        title: "",
        body: "",
        date: 0,
        imageUrls: [],
      };
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteById,

} = journalSlice.actions;
