import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Container, Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { db } from "../../firebase.js";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 24,
  },
  number: {
    fontSize: 36,
    color: "blue",
  },
  actions: {
    alignItems: "center",
  },
  mainRequestCont: {
    display: "flex",
    flexDirection: "row",
  },
  requestSummary: {
    alignItems: "right",
  },
  requestSummaryButtons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const listOfRequests = [
  {
    name: "ABC XYZ",
    city: "Surat",
    checkin: "123",
    checkout: "234",
    age: "34",
    contact: "123445",
  },
  {
    name: "ABC XYZ",
    city: "Surat",
    checkin: "123",
    checkout: "234",
    age: "34",
    contact: "123445",
  },
];

function RequestsCard() {
  const classes = useStyles();
  const [list, setList] = React.useState(listOfRequests);
  const [guest, setGuest] = React.useState([]);

  const handleAcceptRequest = (index) => {
    let newRequestList = [...list];
    newRequestList.splice(index, 1);
    setList(newRequestList);
  };
  const handleRejectRequest = (index) => {
    let newRequestList = [...list];
    newRequestList.splice(index, 1);
    setList(newRequestList);
  };
  async function loadData() {
    await db.collection('bookings').onSnapshot((snap) => {
      if (snap.size) {
        let mylist = [];
        snap.forEach((doc) => {
          if (doc.data().status === 'pending') {
            mylist.push({ ...doc.data() });
          }
        })
        setGuest(mylist);
      }
    })
  };

  useEffect(() => {
    loadData();
    console.log(guest);
  }, [])

  return (
    <Card>
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          List of Requests
        </Typography>
        <div id="add-to-accordian">
          {guest && guest.map((request, index) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                >
                  <AccountCircleIcon fontSize="large" />
                  <Container className={classes.mainRequestCont}>
                    <Container className={classes.requestSummary}>
                      <Grid>
                        <Grid
                          container
                          spacing={2}
                          style={{ textAlign: "center" }}
                        >
                          <Grid item xs>
                            <Typography>Guest Name: {request.guestName}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Container>
                    <Container className={classes.requestSummaryButtons}>
                      <ButtonGroup>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAcceptRequest(index);
                          }}
                          color="primary"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRejectRequest(index);
                          }}
                          color="secondary"
                        >
                          Reject
                        </Button>
                      </ButtonGroup>
                    </Container>
                  </Container>
                </AccordionSummary>
                <AccordionDetails>
                  <Container>
                    <Typography>
                      <strong>Check in: </strong> {request.checkin}
                    </Typography>
                    <Typography>
                      <strong>Check Out: </strong> {request.checkout}
                    </Typography>
                    <Typography>
                      <strong>Current City:</strong> {request.currentCity}
                    </Typography>
                    <Typography>
                      <strong>Age: </strong> {request.age}
                    </Typography>
                    <Typography>
                      <strong>Contact No.: </strong> {request.contactNum}
                    </Typography>
                  </Container>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </CardContent>
      <CardActions>
        <Button className={classes.button} size="small">
          Show More
        </Button>
      </CardActions>
    </Card>
  );
}

export default RequestsCard;
