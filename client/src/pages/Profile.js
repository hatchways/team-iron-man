/*
UI for Profile page.
*/

import React, { useState } from "react";
import {
    makeStyles,
    Typography,
    Grid,
    Avatar,
    Divider,
    Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SettingsIcon from "@material-ui/icons/Settings";
import { useUserState } from "../ContextProvider/user";
import { useHistory } from 'react-router-dom';
import ChangeUserName from '../components/ChangeUserName';
import ChangePassword from '../components/ChangePassword';
import ChangeAvatar from '../components/ChangeAvatar';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "50%",
        height: "70vh",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow:
            "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)",
        borderRadius: "10px",
        padding: "50px",
        paddingBottom: "80px",
        margin: 'auto',
        marginTop: "10vh",
        overflowY: "auto",
        [theme.breakpoints.down('sm')]: {
            marginTop: "5vh",
            width: '70%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            padding: "20px",
        },
    },
    header: {
        fontSize: "48px",
        textAlign: "left",
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            fontSize: '36px',
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            fontSize: '24px',
        },
    },
    subheader: {
        fontSize: "24px",
        textAlign: "left",
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            fontSize: '16px',
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: "center",
            fontSize: '12px',
        },
    },
    settings: {
        fontSize: "24px",
        textAlign: "left",
    },
    hr: {
        border: "1px solid #00e676",
        marginTop: "60px",
        marginBottom: "60px",
    },
    button: {
        marginTop: "50px",
        display: "block",
    },
    block: {
        display: "block",
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    left: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomSpacing: {
        marginBottom: "20px",
    },
    large: {
        width: "80px",
        height: "80px",
    },
}));

function Profile() {
    const classes = useStyles();
    const { avatar, user, email } = useUserState();
    const demoAccount = (email.substring(0, 11) === "demoaccount" && email.substring(12) === "@cluewords.com");
    const history = useHistory();
    const [passwordError, setPasswordError] = useState(false);
    const [inputValues, setInputValues] = useState({
        userName: user,
        email: "",
        oldPassword: "",
        newPassword1: "",
        newPassword2: "",
        showOldPassword: false,
        showNewPassword1: false,
        showNewPassword2: false,
    });
    const [snackbarSettings, setSnackbarSettings] = useState({ open: false, msg: '', type: '' })

    const handleChange = (prop) => (e) => {
        prop.indexOf("newPassword") !== -1 && setPasswordError(false);
        setInputValues({
            ...inputValues,
            [prop]: e.target.value,
        });
    };

    const handleClickShowPassword = (prop) => {
        setInputValues({ ...inputValues, [prop]: !inputValues[prop] });
    };

    const changeUserName = async () => {
        if (!demoAccount) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: inputValues.userName })
            };
            try {
                const response = await fetch(`/api/changeusername`, requestOptions);
                if (response.status === 200) {
                    return history.go(0);
                }
            } catch (error) {
                throw error;
            }
        } else {
            setSnackbarSettings({ open: true, msg: 'You cannot change the name of a demo account.', type: 'error' });
        }
    }

    const changePassword = async () => {
        if (!demoAccount) {
            if (inputValues.newPassword1 === inputValues.newPassword2) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ oldPassword: inputValues.oldPassword, newPassword: inputValues.newPassword1 })
                };
                try {
                    const response = await fetch(`/api/changepassword`, requestOptions);
                    if (response.status === 200) {
                        setSnackbarSettings({ open: true, msg: 'Password change successful!', type: 'success' });
                    }
                    else if (response.status === 400) {
                        setSnackbarSettings({ open: true, msg: 'Error! Old password might be incorrect.', type: 'error' });
                    }
                } catch (error) {
                    throw error;
                }
            }
            else {
                setPasswordError(true)
            }
        }
        else {
            setSnackbarSettings({ open: true, msg: 'You cannot change the password of a demo account.', type: 'error' });
        }
    }

    return (
        <div className={classes.container}>
            <Grid container>
                <Grid item xs={12} sm={2} className={classes.left}>
                    <Avatar
                        alt="Some Dude"
                        src={avatar}
                        className={classes.large}
                    />
                </Grid>
                <Grid item xs={12} sm={10} className={classes.right}>
                    <Typography color="textPrimary" className={classes.header}>
                        {user}
                    </Typography>
                    <Typography color="textPrimary" className={classes.subheader}>
                        {email}
                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.hr} variant="middle" />
            <Typography
                color="textPrimary"
                className={classes.settings + " " + classes.bottomSpacing}
            >
                <SettingsIcon />
                Settings:
            </Typography>
            <ChangeUserName
                userName={inputValues.userName}
                handleChange={handleChange}
                changeUserName={changeUserName}
            />
            <ChangePassword
                oldPassword={inputValues.oldPassword}
                newPassword1={inputValues.newPassword1}
                newPassword2={inputValues.newPassword2}
                showOldPassword={inputValues.showOldPassword}
                showNewPassword1={inputValues.showNewPassword1}
                showNewPassword2={inputValues.showNewPassword2}
                passwordError={passwordError}
                handleChange={handleChange}
                changePassword={changePassword}
                handleClickShowPassword={handleClickShowPassword}
            />
            <ChangeAvatar />
            <Divider className={classes.hr} variant="middle" />
            <Snackbar open={snackbarSettings.open}>
                <Alert onClose={() => setSnackbarSettings({ open: false, msg: '', type: '' })} severity={snackbarSettings.type} variant='filled'>
                    {snackbarSettings.msg}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Profile;
