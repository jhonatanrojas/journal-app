import { SaveOutlined, UploadFile, UploadOutlined } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useMemo, useRef } from "react";
import { clearNotesLogout, setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const NoteView = () => {
  const dispatch = useDispatch();

  const { activeNote, messageSaved, isSaving } = useSelector(
    (state) => state.journal
  );

  const { title, body, date, imageUrls, onInputChange } = useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota Actualizada", messageSaved, "success");
    }
  }, [messageSaved]);


  const onSaveNote = () => {
    dispatch(setActiveNote({ ...activeNote, title, body, date, imageUrls }));

    dispatch(clearNotesLogout());
  };

  const onFileInputChange = ({ target }) => {

    if (target.files.length > 0) {
      dispatch(startUploadingFiles(target.files));
    }
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      className="animate__animated animate__fadeIn animate__faster"
    >
      {/* Sección de Fecha y Botón */}

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1" color="textSecondary">
          {dateString}
        </Typography>

   
        <input type="file" multiple  
        onChange={onFileInputChange}
        ref={fileInputRef}
        style={{ display: "none" }}
        />
        <IconButton color="primary" disabled={isSaving}
              onClick={() => fileInputRef.current.click()}
        
        >
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          variant="contained"
          color="primary"
          startIcon={<SaveOutlined />}
          sx={{ padding: "10px 20px" }}
        >
          Guardar
        </Button>
      </Grid>

      {/* Sección de Campos de Texto */}
      <Grid container direction="column" spacing={1}>
        <TextField
          type="text"
          name="title"
          value={title}
          onChange={onInputChange}
          variant="outlined"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ mb: 2 }}
        />
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          name="body"
          value={body}
          onChange={onInputChange}
          multiline
          rows={5}
          placeholder="¿Qué sucedió en el día de hoy?"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button
          onClick={() => onDelete()}
          color="error"
          startIcon={<UploadFile />}
        >
          Borrar
        </Button>
      </Grid>

      {/* Galería de Imágenes (comentada) */
      console.log(activeNote)
      }
      { activeNote.imageUrls && (
        <ImageGallery images={activeNote.imageUrls} />
      )}
    
    </Grid>
  );
};
