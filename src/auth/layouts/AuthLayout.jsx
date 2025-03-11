import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";


// eslint-disable-next-line react/prop-types
export const AuthLayout = ({ children, title =''}) => {
  return (
    <Grid
    className=""
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          minWidth: { xs: "100%", sm: "450px" },
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          { title }
        </Typography>

        { children }
      </Grid>
    </Grid>
  );
};
