/*
Component for available roles.
*/

import React, { useEffect, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, IconButton } from "@material-ui/core";
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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    grid: {
        marginLeft: "100px",
        marginBottom: "30px",
        width: "100%",
        border: "1px solid theme.palette.divider",
        borderRadius: "theme.shape.borderRadius",
        backgroundColor: "theme.palette.background.paper",
    },
    list: {
        width: "50%",
        marginLeft: "140px",
        marginBottom: "20px",
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
});

export default function AvailableRoles() {
    const classes = useStyles();
    const { user } = useUserState();
    const { matchState, setMatchState } = useContext(MatchContext);
    const socketRef = useRef();
    const history = useHistory();
    const matchId = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1);

    useEffect(() => {
        socketRef.current = io.connect("/");
        if (matchState) {
            socketRef.current.on("update-game-engine-" + matchState.matchId, (game) => {
                setMatchState(game);
            });
        } else {
            socketRef.current.emit("get-game-engine", { matchId });
            socketRef.current.on("update-game-engine-" + matchId, (game) => {
                setMatchState(game);
            });
        }
        return () => socketRef.current.disconnect();
    }, [matchId, matchState, setMatchState]);

    const assignRole = (role) => {
        socketRef.current.emit("assign-role", { user, role: role, matchId: matchState.matchId });
    };

    const removeRole = (role) => {
        socketRef.current.emit("remove-role", { user, role: role, matchId: matchState.matchId });
    };

    return (
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
                            // TODO: when testing integration the app would crash sometimes
                            //and reloading thepage would give an empty matchState crashing
                            //it again, so this will let it load but the check if matchstate
                            //isn't empty can be removed later on
                            matchState &&
                            (matchState.redSpymaster.length > 0 ||
                                matchState.playersReady.indexOf(user) !== -1)
                        }
                    >
                        <AddIcon onClick={() => assignRole("redSpymaster")} />
                    </Fab>
                </ListItem>
                {matchState && matchState.redSpymaster.length > 0 && (
                    <ListItem className={classes.listItem + " " + classes.alignCenter}>
                        <Typography>{matchState.redSpymaster}</Typography>
                        {matchState.redSpymaster === user && (
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
                <Divider variant="inset" component="li" />
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
                            matchState && matchState.playersReady.indexOf(user) !== -1
                        }
                    >
                        <AddIcon onClick={() => assignRole("redGuessers")} />
                    </Fab>
                </ListItem>
                {matchState &&
                    matchState.redGuessers.length > 0 &&
                    matchState.redGuessers.map((redGuesser) => (
                        <ListItem
                            className={classes.listItem + " " + classes.alignCenter}
                            key={redGuesser + "redGuesser"}
                        >
                            <Typography>{redGuesser}</Typography>
                            {redGuesser === user && (
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
                <Divider variant="inset" component="li" />
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
                            matchState &&
                            (matchState.blueSpymaster.length > 0 ||
                                matchState.playersReady.indexOf(user) !== -1)
                        }
                    >
                        <AddIcon onClick={() => assignRole("blueSpymaster")} />
                    </Fab>
                </ListItem>
                {matchState && matchState.blueSpymaster.length > 0 && (
                    <ListItem className={classes.listItem + " " + classes.alignCenter}>
                        <Typography>{matchState.blueSpymaster}</Typography>
                        {matchState.blueSpymaster === user && (
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
                <Divider variant="inset" component="li" />
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
                            matchState && matchState.playersReady.indexOf(user) !== -1
                        }
                    >
                        <AddIcon onClick={() => assignRole("blueGuessers")} />
                    </Fab>
                </ListItem>
                {matchState &&
                    matchState.blueGuessers.length > 0 &&
                    matchState.blueGuessers.map((blueGuesser) => (
                        <ListItem
                            className={classes.listItem + " " + classes.alignCenter}
                            key={blueGuesser + "blueGuesser"}
                        >
                            <Typography>{blueGuesser}</Typography>
                            {blueGuesser === user && (
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
                    style={{ fontWeight: 600 }}
                    className={classes.sectionOne}
                >
                    Players ready for match:
                </Typography>
                {matchState && matchState.playersReady.length > 0 && (
                    <List className={classes.block}>
                        {matchState.playersReady.map((player) => (
                            <ListItem key={player} className={classes.block}>
                                <Typography className={classes.block}>{player}</Typography>
                            </ListItem>
                        ))}
                    </List>
                )}
                <Divider orientation="vertical" flexItem />
                <List>
                    <ListItem>
                        <Typography
                            color="textPrimary"
                            style={{ fontWeight: 600 }}
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
                            onClick={() => console.log(matchState)}
                        >
                            Copy
                        </Button>
                    </ListItem>
                </List>
            </Grid>
        </React.Fragment>
    );
}
