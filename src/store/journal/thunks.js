import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      title: "text",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    await setDoc(newDoc, newNote);
    const newDocId = newDoc.id;

    dispatch(addNewEmptyNote(newDocId, newNote));

    dispatch(setActiveNote(newDocId, newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    console.log(uid);
    if (!uid) throw new Error("El UID del usuario no existe");
    const notesSnap = await loadNotes(uid);

    dispatch(setNotes(notesSnap));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    await setDoc(
      doc(FirebaseDB, `${uid}/journal/notes/${note.id}`),
      noteToFirestore,
      { merge: true }
    );

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    // const resp = await fileUpload(files[0]);
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    const activeNote = getState().journal.activeNote;
    dispatch(setActiveNote({ ...activeNote, imageUrls: photosUrls }));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    await deleteDoc(doc(FirebaseDB, `${uid}/journal/notes/${note.id}`));

    dispatch(deleteNoteById(note.id));
  };
}