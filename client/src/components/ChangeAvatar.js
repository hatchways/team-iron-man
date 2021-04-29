import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    makeStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from 'react-router-dom';

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
        fontWeight: "bold",
    },
    dropzone: {
        marginTop: "8px",
        width: "100%",
        height: "100px",
        border: "2px dashed #00e676",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer"
    },
    dropzoneText: {
        fontWeight: "600",
        fontSize: "x-large",
    },
    active: {
        border: "3px solid #00e676",
        backgroundColor: "lightgray"
    }
});

const ChangeAvatar = () => {

    const classes = useStyles();
    const history = useHistory();

    const onDrop = useCallback(async (acceptedFile) => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

        const formData = new FormData();
        formData.append("file", acceptedFile[0]);
        formData.append(
            "upload_preset",
            process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );
        const cloudinaryResponse = await fetch(url, {
            method: "post",
            body: formData,
        });
        const cloudinaryData = await cloudinaryResponse.json();
        const avatarUrl = cloudinaryData.url
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar: avatarUrl })
        };
        try {
            const backendResponse = await fetch(`/api/changeavatar`, requestOptions);
            if (backendResponse.status === 200) {
                return history.go(0);
            }
        } catch (error) {
            throw error;
        }
    }, [history]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false,
    });

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.accordionSummary}
            >
                <Typography>Change Avatar</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div
                    {...getRootProps()}
                    className={`${classes.dropzone} ${isDragActive ? classes.active : null}`}
                >
                    <input {...getInputProps()} />
                    <Typography className={classes.dropzoneText}>Drop An Image File or Click To Browse</Typography>
                    <ImageIcon fontSize="large" />
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default ChangeAvatar;