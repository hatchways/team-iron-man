import React from 'react';
import {
    Button,
    makeStyles,
    Typography,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    InputAdornment,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles({
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
    bottomSpacing: {
        marginBottom: "20px",
    },
    accordionSummary: {
        backgroundColor: "#00e676",
    },
    inputHalf: {
        width: "95%",
    },
    inputLabel: {
        margin: "10px 0 10px 0",
        textAlign: "left",
    },
    buttonGreen: {
        backgroundColor: "#00e676",
        textTransform: "none",
        "&:hover": {
            backgroundColor: "#00a152",
        },
    },
});

const ChangePassword = (props) => {

    const classes = useStyles();

    return (
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
                            value={props.newPassword1}
                            id="new-password1"
                            label="New Password"
                            onChange={props.handleChange("newPassword1")}
                            className={classes.inputHalf}
                            variant="outlined"
                            error={props.passwordError}
                            helperText={props.passwordError ? "Passwords do not match!" : ""}
                            type={props.showNewPassword1 ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => props.handleClickShowPassword("showNewPassword1")}
                                            edge="end"
                                        >
                                            {props.showNewPassword1 ? (
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
                            value={props.newPassword2}
                            id="new-password2"
                            label="Confirm New Password"
                            onChange={props.handleChange("newPassword2")}
                            error={props.passwordError}
                            helperText={props.passwordError ? "Passwords do not match!" : ""}
                            className={classes.inputHalf}
                            variant="outlined"
                            type={props.showNewPassword2 ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => props.handleClickShowPassword("showNewPassword2")}
                                            edge="end"
                                        >
                                            {props.showNewPassword2 ? (
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
                            value={props.oldPassword}
                            id="old-password"
                            label="Old Password"
                            onChange={props.handleChange("oldPassword")}
                            className={classes.inputHalf}
                            variant="outlined"
                            type={props.showOldPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => props.handleClickShowPassword("showOldPassword")}
                                            edge="end"
                                        >
                                            {props.showOldPassword ? (
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
                            onClick={props.changePassword}
                        >
                            Submit
                            </Button>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}

export default ChangePassword;