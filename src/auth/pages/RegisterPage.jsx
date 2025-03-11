import LinkM from "@mui/material/Link";
import { Link } from "react-router";
import { Alert, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { AuthLayout } from "../layouts/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isChekingAuth = useMemo(() => status === "checking", [status]);
  const formValidations = {
    email: [(value) => value.includes("@"), "El correo debe ser valido"],

    password: [
      (value) => value.length >= 6,
      "La contraseña debe tener mas de 6 letras",
    ],

    name: [(value) => value.length >= 1, "El nombre es obligatorio"],
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    email,
    password,
    name,
    onInputChange,
    passwordValid,
    emailValid,
    nameValid,
    isFormValid,
  } = useForm(
    {
      name: "jhona",
      email: "jhona@gmai.com",
      password: "123456",
    },
    formValidations
  );

  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword({ email, password, name }));
  };

  return (
    <AuthLayout title="Registro">
      <form className="animate__animated animate__fadeIn animate__faster">
        <Grid xs={12} sx={{ mb: 2 }}>
          <TextField
            type="text"
            placeholder="Nombres"
            fullWidth
            name="name"
            onChange={onInputChange}
            value={name}
            error={nameValid}
            helperText={nameValid}
          />
        </Grid>
        <Grid xs={12} sx={{ mb: 2 }}>
          <TextField
            type="email"
            placeholder="Correo"
            fullWidth
            name="email"
            onChange={onInputChange}
            value={email}
            error={emailValid && formSubmitted}
            helperText={emailValid}
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            type="password"
            placeholder="Contraseña"
            fullWidth
            name="password"
            onChange={onInputChange}
            value={password}
            error={passwordValid && formSubmitted}
            helperText={passwordValid}
          />
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>

          <Grid
            xs={6}
            sx={{ width: "100%" }}
            display={!!errorMessage ? "" : "none"}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          
          <Grid xs={6} sx={{ width: "100%" }}>
            <Button
              disabled={isChekingAuth}
              variant="contained"
              fullWidth
              onClick={onSubmit}
              type="submit"
            >
              Registrarse
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          spacing={2}
          sx={{ mt: 2 }}
          justifyContent={"end"}
        >
          <LinkM component={Link} to="/auth/login" color="inherit">
            ¿Ya tienes cuenta?
          </LinkM>
        </Grid>
      </form>
    </AuthLayout>
  );
};
