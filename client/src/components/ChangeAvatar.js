import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    makeStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
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
        fontWeight: "bold",
    },
    dropzone: {
        height: "8rem",
        margin: "1rem",
        padding: "1rem",
        border: "2px dashed salmon",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        cursor: "pointer"
    },
    active: {
        border: "2px solid rebeccapurple"
    }
});

const ChangeAvatar = (props) => {

    const classes = useStyles();
    const [uploadedFile, setUploadedFile] = useState({});

    const onDrop = useCallback(async (acceptedFile) => {
        console.log(acceptedFile);
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

        const formData = new FormData();
        formData.append("file", acceptedFile[0]);
        formData.append(
            "upload_preset",
            process.env.REACT_APP_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        const response = await fetch(url, {
            method: "post",
            body: formData,
        });
        const data = await response.json();
        console.log(data);
        setUploadedFile(data);

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accepts: "image/*",
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
        Drop An Image File or Click To Browse
      </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default ChangeAvatar;