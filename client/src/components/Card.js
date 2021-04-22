import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
    box: {
        height: "80%",
        width: "13vw",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        cursor: "pointer",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "500",
        fontSize: "x-large",
    },
    blueRevealed: {
        background: "#36D1DC" /* fallback for old browsers */,
        background:
            "-webkit-linear-gradient(to right, #5B86E5, #36D1DC)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
            "linear-gradient(to right, #5B86E5, #36D1DC)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    },
    redRevealed: {
        background: "#ff9966",
        background: "-webkit-linear-gradient(to right, #ff5e62, #ff9966)",
        background: "linear-gradient(to right, #ff5e62, #ff9966)",
    },
    blackRevealed: {
        background: "#000000",
        background: "-webkit-linear-gradient(to left, #434343, #000000)",
        background: "linear-gradient(to left, #434343, #000000)",
    },
    whiteRevealed: {
        background: "#8e9eab",
        background: "-webkit-linear-gradient(to left, lightgray, #8e9eab)",
        background: "linear-gradient(to left, lightgray, #8e9eab)",
    },
    defaultHidden: {
        backgroundColor: "white",
        color: "gray",
    },
    blueText: {
        color: "#5B86E5 !important",
    },
    redText: {
        color: "#ff5e62 !important",
    },
    blackText: {
        color: "black",
    },
    whiteTextRevealed: {
        color: "white",
    },
});

const Card = (props) => {
    const classes = useStyles();

    return (
        <Box
            className={
                (props.revealed
                    ? classes[props.color + "Revealed"] +
                    " " +
                    classes["whiteTextRevealed"]
                    : (props.spyMaster ? classes[props.color + "Text"] : "") +
                    " " +
                    classes["defaultHidden"]) +
                " " +
                classes["box"]
            }
        >
            {props.word}
        </Box>
    );
};

export default Card;
