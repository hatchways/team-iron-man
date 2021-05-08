/*
Component for available roles.
*/

import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, IconButton, CircularProgress } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { useUserState } from '../ContextProvider/user';
import { MatchContext } from '../ContextProvider/match';
import { useHistory, useParams } from 'react-router-dom';
import { SocketContext } from '../ContextProvider/socket';

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
        '@media (max-width:600px)': {
            width: '80%'
        }
    },
    listItem: {
        marginLeft: "-10px",
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
    gridItem: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
    },
    gridDivider: {
        '@media (min-width:960px)': {
            borderLeft: '1px solid lightgray',
        },
        '@media (max-width:960px)': {
            borderTop: '1px solid lightgray',
            paddingTop: '20px',
            marginTop: '20px'
        }
    },
    copyButton: {
        backgroundColor: '#eeeeee',
        marginTop: '20px',
        border: '1px solid black'
    }
});

export default function AvailableRoles() {
    const classes = useStyles();
    const { user, email } = useUserState();
    const { matchState, setMatchState } = useContext(MatchContext);
    const socket = useContext(SocketContext);
    const history = useHistory();
    const { matchIdParam } = useParams();

    useEffect(() => {
        if (matchState) {
            if (matchState.inProgress) {
                socket.off('update-game-engine-' + matchState.matchId);
                return history.push(`/gamelayout/${matchState.matchId}`);
            }
            socket.on('update-game-engine-' + matchState.matchId, (game) => {
                setMatchState(game);
            });
        } else {
            socket.emit('get-game-engine', { matchId: matchIdParam });
            socket.on('update-game-engine-' + matchIdParam, (game) => {
                setMatchState(game);
            });
        }
        return () => socket.off('update-game-engine-' + matchIdParam);
    }, [socket, matchState]);

    const assignRole = (role) => {
        if (!matchState.inProgress) {
            socket.emit('assign-role', {
                player: { name: user, email },
                role: role,
                matchId: matchState.matchId,
            });
        }
    };

    const removeRole = (role) => {
        if (!matchState.inProgress) {
            socket.emit('remove-role', {
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
                    <Grid container className={classes.grid}>
                        <Grid item xs={12} sm={6} md={5} className={classes.gridItem}>
                            <Typography
                                color="textPrimary"
                            >
                                Players ready for match:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
                            {matchState && matchState.invitedPlayers.length > 0 && (
                                <List className={classes.block}>
                                    {matchState.invitedPlayers.map((player) => (
                                        <ListItem key={player.name} className={classes.block}>
                                            <Typography className={classes.block}>
                                                {player.name}{matchState.playersReady.find((ready) => ready.email === player.email) ? <span>{" "}&#9989;</span> : <>&#10060;</>}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Grid>
                        <Grid item sm={5} md={4} className={classes.gridItem + ' ' + classes.gridDivider}>
                            <div>
                                <Typography
                                    color="textPrimary"
                                    align="center"
                                >
                                    Share match id:
                                </Typography>

                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<InsertLinkIcon />}
                                    onClick={() => navigator.clipboard.writeText(matchState.matchId)}
                                    className={classes.copyButton}
                                >
                                    Copy
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </React.Fragment>
            ) : (
                <CircularProgress className={classes.blueSpinner} />
            )}
        </React.Fragment >
    );
}
