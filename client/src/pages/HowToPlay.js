/*
UI for home page.
*/

import React, { useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Overview from './Instructions/Overview';
import GettingStarted from './Instructions/GettingStarted';
import CreatingMatch from './Instructions/CreatingMatch';
import JoingingMatch from './Instructions/JoiningMatch';
import AssigningRoles from './Instructions/AssigningRoles';
import GameLayout from './Instructions/GameLayout';
import GameBoard from './Instructions/GameBoard';
import GameChat from './Instructions/GameChat';
import Gameplay from './Instructions/Gameplay';
import TurnCycle from './Instructions/TurnCycle';
import WinConditions from './Instructions/WinConditions';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '50%',
    minHeight: '80vh',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    borderRadius: '10px',
    padding: '50px',
    paddingBottom: '80px',
    margin: '5vh auto auto auto',
    [theme.breakpoints.down('md')]: {
      width: '40%',
      margine: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      margine: 'auto',
      padding: '30px',
      paddingBottom: '50px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      margine: 'auto',
      padding: '20px',
      paddingBottom: '20px',
    },
  },
  header: {
    fontWeight: '600',
    fontSize: '36px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px',
    },
  },
  hr: {
    width: '10%',
    border: '1px solid #00e676',
  },
  button: {
    marginTop: '20px',
  },
  block: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '45vh',
    width: '60%',
    margin: 'auto',
    textAlign: 'left',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  input: {
    width: '100%',
  },
  tableOfContentsHeader: {
    fontWeight: 'bold',
    margin: '20px 0 20px 0',
  },
  tableOfContentsLink: {
    color: '#1769aa',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  tabbed: {
    marginLeft: 20,
  },
  description: {
    fontStyle: 'italic',
  },
  arrowButton: {
    color: '#00e676',
    fontSize: '50px',
    cursor: 'pointer',
    '&:hover': {
      color: '#76ff03',
    },
  },
  content: {
    height: "45vh",
    width: "60%",
    margin: "auto",
    textAlign: "left",
    overflowY: "auto",
    overflowX: 'hidden'
  },
  input: {
    width: "100%",
  },
  tableOfContentsHeader: {
    fontWeight: "bold",
    margin: "20px 0 20px 0",
    fontFamily: 'Roboto'
  },
  tableOfContentsLink: {
    color: "#1769aa",
    fontFamily: 'Roboto',
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  tabbed: {
    marginLeft: 20,
  },
  description: {
    fontStyle: 'italic',
    fontFamily: 'Roboto'
  },
  arrowButton: {
    color: "#00e676",
    fontSize: "50px",
    cursor: "pointer",
    '&:hover': {
      color: "#76ff03",
    }
  },
  disabled: {
    fontSize: "50px",
    color: "gray"
  }
}));

function HowToPlay() {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const returnToHome = () => {
    return history.push('/');
  };

  const pageOne = (
    <React.Fragment>
      <Typography className={classes.description}>
        Cluewords is a clone of the popular board game Codenames. Never played
        Codenames? No problem, this guide will teach you everything you need to
        know.
      </Typography>
      <Typography className={classes.tableOfContentsHeader}>
        Table of Contents:
      </Typography>
      <Typography
        className={classes.tableOfContentsLink}
        onClick={(event) => handleChange(event, 2)}
      >
        Overview
      </Typography>
      <Typography
        className={classes.tableOfContentsLink}
        onClick={(event) => handleChange(event, 3)}
      >
        Getting Started
      </Typography>
      <Typography
        className={`${classes.tableOfContentsLink} ${classes.tabbed}`}
        onClick={(event) => handleChange(event, 4)}
      >
        Creating a match
      </Typography>
      <Typography
        className={`${classes.tableOfContentsLink} ${classes.tabbed}`}
        onClick={(event) => handleChange(event, 5)}
      >
        Joining a match
      </Typography>
      <Typography
        className={classes.tableOfContentsLink}
        onClick={(event) => handleChange(event, 6)}
      >
        Assigning Roles
      </Typography>
      <Typography
        className={classes.tableOfContentsLink}
        onClick={(event) => handleChange(event, 7)}
      >
        Game Layout
      </Typography>
      <Typography
        className={`${classes.tableOfContentsLink} ${classes.tabbed}`}
        onClick={(event) => handleChange(event, 8)}
      >
        Game Board
      </Typography>
      <Typography
        className={`${classes.tableOfContentsLink} ${classes.tabbed}`}
        onClick={(event) => handleChange(event, 9)}
      >
        Game Chat
      </Typography>
      <Typography
        className={classes.tableOfContentsLink}
        onClick={(event) => handleChange(event, 10)}
      >
        Gameplay
      </Typography>
      <Typography
        className={`${classes.tableOfContentsLink} ${classes.tabbed}`}
        onClick={(event) => handleChange(event, 11)}
      >
        Turn Cycle
      </Typography>
      <Typography
        className={`${classes.tableOfContentsLink} ${classes.tabbed}`}
        onClick={(event) => handleChange(event, 12)}
      >
        Win Conditions
      </Typography>
    </React.Fragment>
  );

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const pages = [
    pageOne,
    <Overview />,
    <GettingStarted />,
    <CreatingMatch />,
    <JoingingMatch />,
    <AssigningRoles />,
    <GameLayout />,
    <GameBoard />,
    <GameChat />,
    <Gameplay />,
    <TurnCycle />,
    <WinConditions />,
  ];

  return (
    <div className={classes.container}>
      <Typography color="textPrimary" className={classes.header}>
        How To Play
      </Typography>
      <hr className={classes.hr} />
      <div className={classes.content}>{pages[page - 1]}</div>
      <ArrowBackIcon
        className={page > 1 ? classes.arrowButton : classes.disabled}
        onClick={page > 1 ? previousPage : null}
      />
      <ArrowForwardIcon
        className={page < 12 ? classes.arrowButton : classes.disabled}
        onClick={page < 12 ? nextPage : null}
      />
      <hr className={classes.hr} />
      <Pagination
        count={12}
        page={page}
        onChange={handleChange}
        className={classes.center}
        color="secondary"
      />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={returnToHome}
      >
        Return To Home
      </Button>
    </div>
  );
}

export default HowToPlay;
