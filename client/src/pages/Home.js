/*
UI for home page.
*/

import React, { useContext, useRef } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { useUserState } from "../ContextProvider/user";
import { MatchContext } from "../ContextProvider/match";

const useStyles = makeStyles({
    container: {
        width: "25%",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow:
            "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)",
        borderRadius: "10px",
        padding: "50px",
        paddingBottom: "80px",
        marginLeft: "37.5%",
        marginTop: "9%",
    },

    header: {
        fontWeight: "600",
        fontSize: "48px",
    },

    hr: {
        width: "10%",
        border: "1px solid #00e676",
    },
    button: {
        marginTop: "50px",
        display: "block",
    },
    block: {
        alignItems: "center",
        justifyContent: "center",
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

function Home() {
    const classes = useStyles();
    const history = useHistory();
    const { user } = useUserState();
    const { setMatchState } = useContext(MatchContext);
    const socketRef = useRef();
    socketRef.current = io.connect("/");

    // temporary function until the match controller gets reviewed/merged
    const createGame = () => {
        socketRef.current.emit("create-game-engine", {
            user,
            matchId: "6081f2f65c9146522058e58",
        });
        socketRef.current.on("start-game-engine", (game) => {
            setMatchState(game);
            socketRef.current.disconnect();
        });
        return history.push(`/newgame/6081f2f65c9146522058e58`);
    };

    /*
      const newGame = async () => {
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
          };
          try {
              const response = await fetch(`/api/user/newmatch`, requestOptions);
              const data = await response.json();
              if (response.status === 200) {
                  socketRef.current.emit('create-game-engine', { user: "test" })
                  return history.push(`/newgame/${data.match}`);
              }
          } catch (error) {
              throw error;
          }
      }
      */
    const joinGame = () => {
        return history.push("/join");
    };

    return (
        <div className={classes.container}>
            <Typography color="textPrimary" className={classes.header}>
                Welcome
      </Typography>
            <hr className={classes.hr} />
            <div className={classes.center}>
                <div className={classes.block}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={createGame}
                        className={classes.button}
                    >
                        New Game
          </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={joinGame}
                        className={classes.button}
                    >
                        Join Game
          </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
