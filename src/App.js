import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import IndexTodos from "./components/indexTodos.js";
import AddTodo from "./components/addTodo.js";
import EditTodo from "./components/editTodo.js";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Amplify
import Analytics from '@aws-amplify/analytics';
import { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
Auth.configure(awsconfig);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 2)
  }
}));

//analytics
const mapObj = f => obj =>
  Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: f(obj[key]) }), {});
const toArrayOfStrings = value => [`${value}`];
const mapToArrayOfStrings = mapObj(toArrayOfStrings);

function App() {
  const classes = useStyles();
  
  //Analytics
  useEffect(() => {
    trackUserId();
  }, []);

  async function trackUserId() {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const userAttributes = mapToArrayOfStrings(attributes);
      console.log("-----> " + JSON.stringify(userAttributes));
      Analytics.updateEndpoint({
        address: userAttributes.email[0],
        channelType: 'EMAIL',
        optOut: 'NONE',
        userId: userAttributes.sub[0],
        userAttributes,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <CssBaseline />
          <Container
            fixed
            maxWidth="sm"
            style={{ height: "100vh", paddingTop: 20 }}
          >
            <Paper className={classes.root}>
              <Switch>
                <Route path="/" exact component={IndexTodos} />
                <Route path="/addTodo" component={AddTodo} />
                <Route path="/editTodo/:idTodo" component={EditTodo} />
              </Switch>
            </Paper>
          </Container>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default withAuthenticator(App, {includeGreetings: true});
