import React from 'react';
import {
    Button,
    makeStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles({

    block: {
        display: "block",
    },
    accordionSummary: {
        backgroundColor: "#00e676",
    },
    input: {
        width: "100%",
    },
    inputLabel: {
        margin: "10px 0 10px 0",
        textAlign: "left",
    },
});

const ChangeUserName = (props) => {

    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.accordionSummary}
            >
                <Typography>Change User Name</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.block}>
                <Typography className={classes.inputLabel}>
                    Enter a New User Name:
                    </Typography>
                <TextField
                    value={props.userName}
                    id="user-name"
                    label="New User Name"
                    onChange={props.handleChange("userName")}
                    placeholder="New User Name"
                    className={classes.input}
                    variant="outlined"
                    type="text"
                    InputProps={{
                        endAdornment: (
                            <Button variant="contained" onClick={props.changeUserName}>
                                Submit
                            </Button>
                        ),
                    }}
                />
            </AccordionDetails>
        </Accordion>
    );
}

export default ChangeUserName;