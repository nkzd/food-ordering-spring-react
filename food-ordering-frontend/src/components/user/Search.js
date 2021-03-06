import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({field}) => {
  const classes = useStyles();
  const {searchField, setSearchField} = field;
  return (
    <Paper component="form" onSubmit={(event)=>{event.preventDefault()}} className={classes.root}>
      
      <InputBase
        className={classes.input}
        placeholder="Search restaurants"
        inputProps={{ 'aria-label': 'search restaurants' }}
        value={searchField}
        onChange={event => {
          setSearchField(event.target.value);
        }}
      />
       <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton> 
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}));

export default Search;