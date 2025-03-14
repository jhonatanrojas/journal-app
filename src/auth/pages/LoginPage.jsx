import LinkM from "@mui/material/Link";
import { Link } from "react-router";
import { Alert, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layouts/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";
import { useMemo } from "react";

const formData = {
  email: "pruebas1@gmail.com",
  password: "123456",
};

export const LoginPage = () => {


  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const { email, password, onInputChange } = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form className="animate__animated animate__fadeIn animate__faster">
        <Grid container spacing={2}></Grid>
        <Grid
          xs={6}
          sx={{ width: "100%" }}
          display={errorMessage?.length > 0 ? "" : "none"}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>

        <Grid xs={12} sx={{ mb: 2 }}>
          <TextField
            type="email"
            placeholder="Correo"
            className="form-control"
            fullWidth
            name="email"
            onChange={onInputChange}
            value={email}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            name="password"
            type="password"
            placeholder="Contraseña"
            className="form-control"
            fullWidth
            onChange={onInputChange}
            value={password}
          />
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid xs={6} sx={{ width: "100%" }}>
            <Button
              disabled={isAuthenticating}
              type="submit"
              variant="contained"
              fullWidth
              onClick={onSubmit}
            >
              Login
            </Button>
          </Grid>
          <Grid xs={6} sx={{ width: "100%" }}>
            <Button
              disabled={isAuthenticating}
              variant="contained"
              fullWidth
              color="secondary"
              onClick={onGoogleSignIn}
            >
              <Google />
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          spacing={2}
          sx={{ mt: 2 }}
          justifyContent={"end"}
        >
          <LinkM item component={Link} to="/auth/register" color="inherit">
            ¿No tienes cuenta?
          </LinkM>
        </Grid>
      </form>
    </AuthLayout>
  );
};
