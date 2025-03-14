import { IconButton, Typography } from "@mui/material";

import { JournalLayout } from "../layout/JournalLayout";

import { NothingSelectedView, NoteView } from "../view";
import { PlusOneRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";

export const HomePage = () => {

     const {  isSaving,active}  = useSelector((state) => state.journal);
    const dispatch = useDispatch();
    const onClickNewNote = () => {
        dispatch(startNewNote());
    }


  return (
    <JournalLayout>
      {
      (active) ? <NoteView /> : <NothingSelectedView />
      
      /*       <NothingSelectedView /> */}



    {/*  <NoteView /> */}
      
      <IconButton onClick={onClickNewNote}
      disabled={isSaving}
        size='large'

        sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50

        }}
        
        >
         <PlusOneRounded />

       </IconButton>
    </JournalLayout>
  );
};
