import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    card: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        margin: '30px',
        minHeight: '30rem'
      },
    form: {
        maxWidth: '350px',
        borderRadius: '5px',
        padding: '20px',
        boxShadow: '0px 3px 24px -8px rgba(0, 0, 0, 0.75)'
    },
    button: {
        marginTop: '20px',
        padding: '10px',
        background: 'transparent',
        borderRadius: '5px'
    },
    span: {
        color: 'black'
    },
    nameField: {
        marginBottom: '40px'
    }
});

export default function Chat() {
    const [ state, setState ] = useState({ message: "", name: "" });
	const [ chat, setChat ] = useState([]);
	const socketRef = useRef();
    const classes = useStyles();

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:3002/");
            socketRef.current.on("message", ({ name, message }) => {
                setChat([ ...chat, { name, message } ]);
            })
            return () => socketRef.current.disconnect();
		},[chat]);

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const onMessageSubmit = (e) => {
        const { name, message } = state;
        socketRef.current.emit("message", { name, message });
        e.preventDefault();
        setState({ message: "", name});
    }

    const renderChat = () => {
        return chat.map(({ name, message }, index) => (
            <div key={index}>
                <h3>
                   {name}: <span className={classes.span}>{message}</span>
                </h3>
            </div>
        ))
    }
    
	return (
        <div className={classes.card}>
            <form className={classes.form} onSubmit={onMessageSubmit}>
                <div className={classes.nameField}>
                    <TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
                </div>
                <h1>{state.name}</h1>
                {renderChat()}
                <div>
                    <TextField
                        name="message"
                        onChange={(e) => onTextChange(e)}
                        value={state.message}
                        id="outlined-multiline-static"
                        variant="outlined"
                        label="Message"
                    />
                    <button className={classes.button}>Done</button>
                </div>
            </form>
        </div>
	)
};