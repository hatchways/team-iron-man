/*
Component for available roles.
*/

import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid, Button} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InsertLinkIcon from '@material-ui/icons/InsertLink';

const useStyles = makeStyles({
    grid: {
        marginLeft: '100px',
        marginBottom: '30px',
        width: '100%',
        border: '1px solid theme.palette.divider',
        borderRadius: 'theme.shape.borderRadius',
        backgroundColor: 'theme.palette.background.paper',
    },
    list: {
        width: '50%',
        marginLeft: '140px',
        marginBottom: '20px'
    },
    listItem: {
        marginLeft: '-10px'
    },
    sectionOne: {
        marginRight: '20%'
    },
    sectionTwo: {
        marginLeft: '5%'
    },
    submitButton: {
        marginLeft: '35%'
    }
  });

export default function AvailableRoles() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Red Spy Master" align="center"/>
                    <Fab size="small" color="default" aria-label="Add">
                        <AddIcon />
                    </Fab>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Red Field Agent" align="center"/>
                    <Fab size="small" color="default" aria-label="Add">
                        <AddIcon />
                    </Fab>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Blue Spy Master" align="center"/>
                    <Fab size="small" color="default" aria-label="Add">
                        <AddIcon />
                    </Fab>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Blue Field Agent" align="center"/>
                    <Fab size="small" color="default" aria-label="Add">
                        <AddIcon />
                    </Fab>
                </ListItem>
            </List>
            <Grid container alignItems="center" className={classes.grid}>
                <Typography color="textPrimary" style={{ fontWeight: 600 }} className={classes.sectionOne}>
                    Players ready for match:
                </Typography>
                <Divider orientation="vertical" flexItem />
                <List>
                    <ListItem>
                        <Typography color="textPrimary" style={{ fontWeight: 600 }} align="center" className={classes.sectionTwo}>
                        Share match id:
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" size="small" startIcon={<InsertLinkIcon  />}>Copy</Button>
                    </ListItem>
                </List>
            </Grid>
        </React.Fragment>
    );
}