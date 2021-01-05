import firebase from "../../database/firebase";

// define types

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

// actions

export const updateName = (name) => {
    return {
        type: UPDATE_NAME,
        value: name,
    };
};

export const updateEmail = (email) => {
    return {
        type: UPDATE_EMAIL,
        value: email,
    };
};

export const updatePassword = (password) => {
    return {
        type: UPDATE_PASSWORD,
        value: password,
    };
};

export const login = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user;
            const response = await firebase.auth.signInWithEmailAndPassword(
                email,
                password
            );
            dispatch(getUser(response.user.uid));
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };
};
export const getUser = (uid) => {
    return async (dispatch, getState) => {
        try {
            const user = await firebase.db.collection("users").doc(uid).get();

            dispatch({ type: LOGIN, value: user.data() });
        } catch (e) {
            alert(e);
            console.log(e);
        }
    };
};

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const { name, email, password } = getState().user;
            const response = await firebase.auth.createUserWithEmailAndPassword(
                email,
                password
            );

            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    Name: name,
                    Email: email,
                    Password: password,
                };
                firebase.db
                    .collection("users")
                    .doc(response.user.uid)
                    .set(user);

                dispatch({ type: SIGNUP, value: response.user });
            }
        } catch (e) {
            console.log(e);
        }
    };
};
