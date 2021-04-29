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
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { useUserState } from "../ContextProvider/user";
import ChangeUserName from '../components/ChangeUserName';
import ChangePassword from '../components/ChangePassword';

const useStyles = makeStyles({
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
        marginLeft: "25%",
        marginTop: "10vh",
        overflowY: "scroll"
    },

    header: {
        fontWeight: "600",
        fontSize: "48px",
        textAlign: "left",
    },

    subheader: {
        fontWeight: "400",
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

});

function Profile() {
    const classes = useStyles();
    const { user, email } = useUserState();
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: inputValues.userName })
        };
        try {
            const response = await fetch(`/api/changeusername`, requestOptions);
            const data = await response.json();
            if (response.status === 200) {
                console.log(data);
            }
        } catch (error) {
            throw error;
        }
    }

    const changePassword = async () => {
        if (inputValues.newPassword1 === inputValues.newPassword2) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPassword: inputValues.oldPassword, newPassword: inputValues.newPassword1 })
            };
            try {
                const response = await fetch(`/api/changepassword`, requestOptions);
                const data = await response.json();
                if (response.status === 200) {
                    console.log(data);
                }
            } catch (error) {
                throw error;
            }
        }
        else {
            setPasswordError(true)
        }
    }

    return (
        <div className={classes.container}>
            <Grid container>
                <Grid item xs={2} className={classes.left}>

                    <Avatar
                        alt="Some Dude"
                        src="https://i.imgur.com/CLP18jh.png"
                        className={classes.large}
                    />
                </Grid>
                <Grid item xs={10} className={classes.right}>
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
                className={classes.subheader + " " + classes.bottomSpacing}
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
        </div>
    );
}

export default Profile;
