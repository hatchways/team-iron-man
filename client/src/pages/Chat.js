import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import "../styles/chat.css";


const useStyles = makeStyles({
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
      }
});

export default function Chat() {
    const [ state, setState ] = useState({ message: "" })
	const [ chat, setChat ] = useState([])
	const socketRef = useRef()
    const classes = useStyles();

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:8000/");
            socketRef.current.on("message", ({ message }) => {
                setChat([ ...chat, { message } ]);
            })
            return () => socketRef.current.disconnect();
		},[chat]);

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onMessageSubmit = (e) => {
        const { message } = state
        socketRef.current.emit("message", { message })
        e.preventDefault()
        setState({ message: ""})
    }

    const renderChat = () => {
        return chat.map(({ message }, index) => (
            <div key={index}>
                <h3>
                    <span className={classes.span}>{message}</span>
                </h3>
            </div>
        ))
    }
    
	return (
        <React.Fragment>
            <form className={classes.form} onSubmit={onMessageSubmit}>
                <div>
                    <TextField
                        name="message"
                        onChange={(e) => onTextChange(e)}
                        value={state.message}
                        id="outlined-multiline-static"
                        variant="outlined"
                        label="Message"
                    />
                </div>
                <button className={classes.button}>Click</button>
            </form>
            <div>
                {renderChat()}
            </div>
        </React.Fragment>
		


	)
};