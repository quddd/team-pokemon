import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Hidden, CircularProgress } from "@material-ui/core";
import Conversation from "../components/messages/Conversation";
import Message from "../components/messages/Message";
import MobileMessage from "../components/messages/MobileMessage";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  chatBox: {
    height: "100vh",
    paddingTop: "55px",
  },
  dialogsList: {
    position: "relative",
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: "-20px",
    marginTop: "-20px",
  },
}));

function Chat() {
  const [conversations, setConversations] = useState();
  const classes = useStyles();

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    let resp = await axios.get("/api/chat");
    setConversations(resp.data.data);
  };

  return (
    <Grid container className={classes.chatBox}>
      <Grid item lg={3} md={4} sm={5} xs={12} className={classes.dialogsList}>
        {conversations ? (
          <Conversation conversations={conversations} />
        ) : (
          <CircularProgress size={40} className={classes.loading} />
        )}
      </Grid>
      <Hidden xsDown>
        <Grid item lg={9} md={8} sm={7} style={{ height: "100%" }}>
          <Message />
        </Grid>
      </Hidden>
      <Hidden smUp>
        <MobileMessage />
      </Hidden>
    </Grid>
  );
}

export default Chat;
