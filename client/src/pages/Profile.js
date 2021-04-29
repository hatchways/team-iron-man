/*
UI for home page.
*/

import React, { useState } from "react";
import {
    Button,
    makeStyles,
    Typography,
    Grid,
    Avatar,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    InputAdornment,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useUserState } from "../ContextProvider/user";
import ChangeUserName from '../components/ChangeUserName';

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
    accordionSummary: {
        backgroundColor: "#00e676",
    },
    input: {
        width: "100%",
    },
    inputHalf: {
        width: "95%",
    },
    inputLabel: {
        margin: "10px 0 10px 0",
        textAlign: "left",
        fontWeight: "bold",
    },
    buttonGreen: {
        backgroundColor: "#00e676",
        textTransform: "none",
        "&:hover": {
            backgroundColor: "#00a152",
        },
    },
});

function Profile() {
    const classes = useStyles();
    const { user } = useUserState();
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
        setInputValues({
            ...inputValues,
            [prop]: e.target.value,
        });
    };

    const handleClickShowPassword = (prop) => {
        setInputValues({ ...inputValues, [prop]: !inputValues[prop] });
    };

    const changeUserName = () => {
        console.log(inputValues.userName);
    };

    const changePassword = () => {
        inputValues.newPassword1 === inputValues.newPassword2 ?
            console.log(inputValues.newPassword2)
            :
            setPasswordError(true)
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
                        testuser@test.com
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
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionSummary}
                >
                    <Typography>Change Password</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.block}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography className={classes.inputLabel}>
                                Enter New password:
                            </Typography>
                            <TextField
                                value={inputValues.newPassword1}
                                id="new-password1"
                                label="New Password"
                                onChange={handleChange("newPassword1")}
                                className={classes.inputHalf}
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordError ? "Passwords do not match!" : ""}
                                type={inputValues.showNewPassword1 ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    handleClickShowPassword("showNewPassword1")
                                                }
                                                edge="end"
                                            >
                                                {inputValues.showNewPassword1 ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className={classes.inputLabel}>
                                Confirm New Password:
                            </Typography>
                            <TextField
                                value={inputValues.newPassword2}
                                id="new-password2"
                                label="Confirm New Password"
                                onChange={handleChange("newPassword2")}
                                error={passwordError}
                                helperText={passwordError ? "Passwords do not match!" : ""}
                                className={classes.inputHalf}
                                variant="outlined"
                                type={inputValues.showNewPassword2 ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    handleClickShowPassword("showNewPassword2")
                                                }
                                                edge="end"
                                            >
                                                {inputValues.showNewPassword2 ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography className={classes.inputLabel}>
                                Enter Old password:
                            </Typography>
                            <TextField
                                value={inputValues.oldPassword}
                                id="old-password"
                                label="Old Password"
                                onChange={handleChange("oldPassword")}
                                className={classes.inputHalf}
                                variant="outlined"
                                type={inputValues.showOldPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    handleClickShowPassword("showOldPassword")
                                                }
                                                edge="end"
                                            >
                                                {inputValues.showOldPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button
                                variant="contained"
                                className={classes.buttonGreen}
                                size="large"
                                onClick={changePassword}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Profile;
