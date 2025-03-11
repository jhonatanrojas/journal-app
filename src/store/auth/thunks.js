
import { singInWithGoogle, registerWithEmail, loginWithEmail, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"



export const checkingAuthentication = () => {

    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
   
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await singInWithGoogle();
        if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));

        dispatch(login(result));

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, name }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, ...rest } = await registerWithEmail({ email, password, name });
        if (!ok) return dispatch(logout({ errorMessage: rest.errorMessage }));

        dispatch(login(rest));

    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, ...rest } = await loginWithEmail({ email, password });
        if (!ok) return dispatch(logout({ errorMessage: rest.errorMessage }));

        dispatch(login(rest));
    }
}


export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout({}));
    }
}