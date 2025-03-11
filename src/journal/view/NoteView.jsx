import { SaveOutlined } from '@mui/icons-material';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import Grid from "@mui/material/Grid2";

export const NoteView = () => {
  return (
    <Grid container direction="column" spacing={2}  className="animate__animated animate__fadeIn animate__faster">
      {/* Sección de Fecha y Botón */}
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" color="textSecondary">
          28 de agosto, 2023
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveOutlined />}
          sx={{ padding: '10px 20px' }}
        >
          Guardar
        </Button>
      </Grid>

      {/* Sección de Campos de Texto */}
      <Grid container direction="column" spacing={1}>
        <TextField
          type="text"
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
          multiline
          rows={5}
          placeholder="¿Qué sucedió en el día de hoy?"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Galería de Imágenes (comentada) */}
       <ImageGallery /> 

       <IconButton 
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
         <SaveOutlined fontSize='large' />

       </IconButton>
    </Grid>
  );
};