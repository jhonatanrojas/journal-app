import { TurnedInNot } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { useDispatch } from "react-redux";
// eslint-disable-next-line react/prop-types
export const SideBarItem = ({ id, title, body, date, imageUrls }) => {
  const dispatch = useDispatch();
  const onClickActiveNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  };

  const newTitle = useMemo(() => {
    // eslint-disable-next-line react/prop-types
    if (title?.length > 17) {
      // eslint-disable-next-line react/prop-types
      return title.substring(0, 17) + "...";
    }
    return title;
  }, [title]);
  return (
    <ListItem key={id} disablePadding>
      <ListItemButton
        onClick={() => onClickActiveNote()}
      >
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
