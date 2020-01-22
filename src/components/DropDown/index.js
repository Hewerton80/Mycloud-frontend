import React from 'react';
import {ClickAwayListener} from '@material-ui/core';

export default function ClickAway() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.wrapper}>
        <button type="button" onClick={handleClick}>
          Open menu dropdown
        </button>
        {open ? (
          <div className={classes.div}>Click me, I will stay visible until you click outside.</div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}