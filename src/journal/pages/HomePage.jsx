import { Typography } from "@mui/material";

import { JournalLayout } from "../layout/JournalLayout";

import { NothingSelectedView, NoteView } from "../view";

export const HomePage = () => {
  return (
    <JournalLayout>
      {/*       <NothingSelectedView /> */}

      <NoteView />
    </JournalLayout>
  );
};
