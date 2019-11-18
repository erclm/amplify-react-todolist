import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Grid,
  Avatar,
  Card,
  CardActions,
  Typography,
  Divider
} from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import TimeAgo from "react-timeago";

const useStyles = makeStyles(theme => ({
  itemTodo: {
    padding: 15,
    marginTop: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(1)
  },
  listen: {
    marginLeft: 5
  },
  dateAt: {
    marginTop: theme.spacing(0.5)
  },
  translate: {
    marginTop: 15
  }
}));

function ItemTodo(props) {
  const classes = useStyles();

  const [showTranslate, setShowTranslate] = useState(false);
  const [translatedText, setTranlatedText] = useState("");

  const handleClickListenOriginal = event => {
    console.log("Listen Original");
  };

  const handleClickListenTranslate = event => {
    console.log("Listen Translate");
  };

  const handleClickTranslate = event => {
    if (showTranslate) {
      setShowTranslate(false);
      setTranlatedText("");
    } else {
      setShowTranslate(true);
      setTranlatedText("Ejemplo de texto.");
    }
  };

  return (
    <Card className={classes.itemTodo}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>W</Avatar>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography variant="h6" gutterBottom>
            {props.description}
            <IconButton
              id="listenOriginal"
              className={classes.listen}
              aria-label="Listen"
              size="small"
              onClick={handleClickListenOriginal}
            >
              <VolumeUpIcon />
            </IconButton>
          </Typography>
          <CardActions>
            <TimeAgo date={props.date} className={classes.dateAt} />
            <Button
              className={classes.button}
              size="small"
              onClick={handleClickTranslate}
            >
              Translate
            </Button>
          </CardActions>
          <div style={showTranslate ? {} : { display: "none" }}>
            <Divider />
            <Typography variant="h6" gutterBottom className={classes.translate}>
              {translatedText}
              <IconButton
                id="listenTranslate"
                className={classes.listen}
                aria-label="Listen"
                size="small"
                onClick={handleClickListenTranslate}
              >
                <VolumeUpIcon />
              </IconButton>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ItemTodo;