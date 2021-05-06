/*
Component for available roles.
*/

import React, { useEffect, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, IconButton, CircularProgress } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import { useUserState } from "../ContextProvider/user";
import io from "socket.io-client";
import { MatchContext } from "../ContextProvider/match";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles({
    grid: {
        marginBottom: "30px",
        width: "100%",
        borderRadius: "theme.shape.borderRadius",
        backgroundColor: "theme.palette.background.paper",
        justifyContent: "center",
        alignItems: "center",
    },
    list: {
        width: "50%",
        marginBottom: "20px",
        justifyContent: "center",
        alignItems: "center",
    },
    listItem: {
        marginLeft: "-10px",
    },
    sectionOne: {
        marginRight: "20%",
    },
    sectionTwo: {
        marginLeft: "5%",
    },
    submitButton: {
        marginLeft: "35%",
    },
    block: {
        display: "block",
    },
    blueText: {
        color: "#5B86E5",
    },
    redText: {
        color: "#ff5e62",
    },
    xsmall: {
        height: "30px",
        width: "30px",
        boxShadow: "0px 3px 24px -8px black",
        verticalAlign: "middle",
        backgroundColor: "lightgray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10px",
        "&:hover": {
            backgroundColor: "gray",
        },
    },
    alignCenter: {
        justifyContent: "center",
    },
    blueSpinner: {
        color: "#03a9f4",
    },
});

export default function AvailableRoles() {
    const classes = useStyles();
    const { user, email } = useUserState();
    const { matchState, setMatchState } = useContext(MatchContext);
    const socketRef = useRef();
    const history = useHistory();
    const { matchId } = useParams();

    useEffect(() => {
        socketRef.current = io.connect("/");
        if (matchState) {
            if (matchState.inProgress) {
                socketRef.current.disconnect();
                return history.push(`/gamelayout/${matchState.matchId}`);
            }
            socketRef.current.on(
                "update-game-engine-" + matchState.matchId,
                (game) => {
                    setMatchState(game);
                }
            );
        } else {
            socketRef.current.emit("get-game-engine", { matchId });
            socketRef.current.on("update-game-engine-" + matchId, (game) => {
                setMatchState(game);
            });
        }
        return () => socketRef.current.disconnect();
    }, [matchId, matchState, setMatchState, history]);

    const assignRole = (role) => {
        if (!matchState.inProgress) {
            socketRef.current.emit("assign-role", {
                player: { name: user, email },
                role: role,
                matchId: matchState.matchId,
            });
        }
    };

    const removeRole = (role) => {
        if (!matchState.inProgress) {
            socketRef.current.emit("remove-role", {
                player: { name: user, email },
                role: role,
                matchId: matchState.matchId,
            });
        }
    };

    return (
        <React.Fragment>
            {matchState ? (
                <React.Fragment>
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <ListItemText
                                primary="Red Spy Master"
                                align="center"
                                className={classes.redText}
                            />
                            <Fab
                                size="small"
                                color="default"
                                aria-label="Add"
                                disabled={
                                    (matchState.redSpymaster.hasOwnProperty("name") ||
                                        matchState.playersReady.findIndex(
                                            (obj) => obj.name === user
                                        ) !== -1)
                                }
                            >
                                <AddIcon onClick={() => assignRole("redSpymaster")} />
                            </Fab>
                        </ListItem>
                        {matchState.redSpymaster.name && (
                            <ListItem
                                className={classes.listItem + " " + classes.alignCenter}
                            >
                                <Typography>{matchState.redSpymaster.name}</Typography>
                                {matchState.redSpymaster.name === user && (
                                    <IconButton
                                        color="default"
                                        className={classes.xsmall}
                                        aria-label="Add"
                                        onClick={() => removeRole("redSpymaster")}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                )}
                            </ListItem>
                        )}
                        <Divider variant="middle" component="li" />
                        <ListItem className={classes.listItem}>
                            <ListItemText
                                primary="Red Field Agent"
                                align="center"
                                className={classes.redText}
                            />
                            <Fab
                                size="small"
                                color="default"
                                aria-label="Add"
                                disabled={
                                    matchState.playersReady.findIndex(
                                        (obj) => obj.name === user
                                    ) !== -1
                                }
                            >
                                <AddIcon onClick={() => assignRole("redGuessers")} />
                            </Fab>
                        </ListItem>
                        {matchState.redGuessers.length > 0 &&
                            matchState.redGuessers.map((redGuesser) => (
                                <ListItem
                                    className={classes.listItem + " " + classes.alignCenter}
                                    key={redGuesser.name + "redGuesser"}
                                >
                                    <Typography>{redGuesser.name}</Typography>
                                    {redGuesser.name === user && (
                                        <IconButton
                                            color="default"
                                            className={classes.xsmall}
                                            aria-label="Add"
                                            onClick={() => removeRole("redGuessers")}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    )}
                                </ListItem>
                            ))}
                        <Divider variant="middle" component="li" />
                        <ListItem className={classes.listItem}>
                            <ListItemText
                                primary="Blue Spy Master"
                                align="center"
                                className={classes.blueText}
                            />
                            <Fab
                                size="small"
                                color="default"
                                aria-label="Add"
                                disabled={
                                    (matchState.blueSpymaster.hasOwnProperty("name") ||
                                        matchState.playersReady.findIndex(
                                            (obj) => obj.name === user
                                        ) !== -1)
                                }
                            >
                                <AddIcon onClick={() => assignRole("blueSpymaster")} />
                            </Fab>
                        </ListItem>
                        {matchState.blueSpymaster.name && (
                            <ListItem
                                className={classes.listItem + " " + classes.alignCenter}
                            >
                                <Typography>{matchState.blueSpymaster.name}</Typography>
                                {matchState.blueSpymaster.name === user && (
                                    <IconButton
                                        color="default"
                                        className={classes.xsmall}
                                        aria-label="Add"
                                        onClick={() => removeRole("blueSpymaster")}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                )}
                            </ListItem>
                        )}
                        <Divider variant="middle" component="li" />
                        <ListItem className={classes.listItem}>
                            <ListItemText
                                primary="Blue Field Agent"
                                align="center"
                                className={classes.blueText}
                            />
                            <Fab
                                size="small"
                                color="default"
                                aria-label="Add"
                                disabled={
                                    matchState.playersReady.findIndex(
                                        (obj) => obj.name === user
                                    ) !== -1
                                }
                            >
                                <AddIcon onClick={() => assignRole("blueGuessers")} />
                            </Fab>
                        </ListItem>
                        {matchState.blueGuessers.length > 0 &&
                            matchState.blueGuessers.map((blueGuesser) => (
                                <ListItem
                                    className={classes.listItem + " " + classes.alignCenter}
                                    key={blueGuesser.name + "blueGuesser"}
                                >
                                    <Typography>{blueGuesser.name}</Typography>
                                    {blueGuesser.name === user && (
                                        <IconButton
                                            color="default"
                                            className={classes.xsmall}
                                            aria-label="Add"
                                            onClick={() => removeRole("blueGuessers")}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    )}
                                </ListItem>
                            ))}
                    </List>
                    <Grid container alignItems="center" className={classes.grid}>
                        <Typography
                            color="textPrimary"
                            className={classes.sectionOne}
                        >
                            Players ready for match:
                        </Typography>
                        {matchState.playersReady.length > 0 && (
                            <List className={classes.block}>
                                {matchState.playersReady.map((player) => (
                                    <ListItem key={player.name} className={classes.block}>
                                        <Typography className={classes.block}>
                                            {player.name}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        <Divider orientation="vertical" flexItem />
                        <List>
                            <ListItem>
                                <Typography
                                    color="textPrimary"
                                    align="center"
                                    className={classes.sectionTwo}
                                >
                                    Share match id:
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<InsertLinkIcon />}
                                    onClick={() => navigator.clipboard.writeText(matchId)}
                                >
                                    Copy
                                </Button>
                            </ListItem>
                        </List>
                    </Grid>
                </React.Fragment>
            ) : (
                <CircularProgress className={classes.blueSpinner} />
            )}
        </React.Fragment>
    );
}
