import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { PeersRouter } from './PeersRouter';
import { Link, useHistory } from 'react-router-dom';
import { Box, ListItemIcon, TextField } from '@material-ui/core';
import { getReport } from '../services';
import { StarRate } from '@material-ui/icons';
import { SearchBar } from '../components/SearchBar'

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function PeersDashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [id, setId] = useState('RELI')

  const [data, setData] = useState();

  useEffect(() => {
    setData(undefined)
    getReport(id).then(setData);
  }, [id])


  const tabs = {
    'ROE': `/peers/${id}/roe`, 'D/E': `/peers/${id}/de`,
    'EPS': `/peers/${id}/eps`, 'Holdings': `/peers/${id}/holdings`
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {Object.keys(tabs).map((text, index) => (
              <Link style={{ textDecoration: 'none', color: 'black' }} to={tabs[text]}>
                <ListItem button key={text}>
                  <ListItemIcon><StarRate /> </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Box width={500} m={"auto"} >
          <SearchBar onChange={(sid) => {
            setId(sid)
            history.push(`/peers/${sid}/roe`)
          }} />
        </Box>
        <Toolbar />
        <PeersRouter data={data} />
      </main>
    </div>
  );
}