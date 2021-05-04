/*
UI for creating a new game.
*/

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import GameInvitation from "../components/GameInvitation";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { MatchContext } from "../ContextProvider/match";
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: "50%",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow:
            "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)",
        borderRadius: "10px",
        padding: "50px",
        paddingBottom: "80px",
        marginLeft: "25%",
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
    spacing: {
        marginTop: "20px",
    },
    background: {
        display: "flex",
        justifyContent: "center",
    },
    leaveButton: {
      marginTop: '20px',
      align: 'center',
      width: '110px',
      backgroundColor: '#f23f3f',
      color: 'white',
    },
    stayButton: {
      marginTop: '30px',
      align: 'center',
      width: '120px',
      color: 'black',
    },
    leaveButtonInner: {
      marginLeft: '40px',
      marginTop: '30px',
      align: 'center',
      width: '120px',
      backgroundColor: '#f23f3f',
      color: 'white',
    },
    modal : {
      textAlign: 'center',
      paddingTop: '20px',
    },
    popupHeader: {
      fontSize: "20px",
      color: 'red',
    },
});

function NewGame() {
    const history = useHistory();
    const { matchState } = useContext(MatchContext);
    const classes = useStyles();

    // TODO: Implement creation of new game in the future.
    const createGame = () => {
        history.push(`/join/${matchState.matchId}`);
    };

    const [open, setOpen] = React.useState(false);

    const cancelMatch = () => {
      fetch(`/api/match/delete/${matchState.matchId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }})
        .then((responce) => {
          console.log(responce);
        })
        .catch((err) => {
          console.log(err);
        });

      return history.push('/home');
    };

    const CancelMatchPopup = () => (
      <div>
        <Button className={classes.leaveButton} onClick={()=>{setOpen(true);}}>
          CANCEL MATCH
        </Button>
          <Dialog
            open={open}
            onClose={()=>{setOpen(false);}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className = {classes.modal}
            >
            <DialogTitle id="alert-dialog-title" className = {classes.popupHeader} >{"Are you canceling the match?"}</DialogTitle>

          <DialogActions>
            <Button onClick={()=>{setOpen(false);}} className={classes.stayButton} variant="contained" color="secondary">
              STAY
            </Button>
            <Button
              onClick={() => {
                console.log("CANCEL MATCH");
                cancelMatch();}}
              color="primary"
              className={classes.leaveButtonInner} >
              CANCEL MATCH
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    );

    return (
        <div className={classes.container}>
            <Typography color="textPrimary" className={classes.header}>
                New Game
      </Typography>
            <hr className={classes.hr} />
            <GameInvitation />
            <Button
                variant="contained"
                color="secondary"
                onClick={createGame}
                className={classes.spacing}
            >
                Create Game
      </Button>
      <CancelMatchPopup></CancelMatchPopup>
        </div>
    );
}

export default NewGame;
