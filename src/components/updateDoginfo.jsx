import React, { useState, useEffect, useContext } from "react";
import CreateIcon from "@material-ui/icons/Create";
import {
  Box, Button, Snackbar, Table,
  TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { status, json } from '/utilities/requestHandlers';
import UserContext from '../contexts/user';



// Creating styles
const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 650,
  },
  snackbar: {
    bottom: "104px",
  },
});



function TableDemo(props) {
  const user = useContext(UserContext);
  // Creating style object
  const classes = useStyles();

  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([]);

  // Initial states
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const authbasic = props.authbasic;


  useEffect(() => {

    console.log('component mounted!')
    fetch('https://Server.alexyu22.repl.co/api/v1/articles')
      .then(status)
      .then(json)
      .then(data => {
        // this.setState({ posts: data })
        //setRows(data)
        console.log("post ", data)
        // data.map((pet)=>
        //   setRows(id=1,title=pet.title,alltext=pet.alltext,summary=pet.summary))

        for (let i = 0; i < data.length; i++) {
          setRows(oldArray => [...oldArray, { id: data[i].id, title: data[i].title, alltext: data[i].alltext, summary: data[i].summary, authorid: 1, imageurl: data[i].imageurl}])
        }

        // setposts(posts.filter(posts=>
        //     posts.toLowerCase().includes(q)))



      })
      .catch(err => console.log("Error fetching articles", err));
  }, [])



  // ,{
  //         method: "GET",
  //         headers:{"Authorization": "Basic " +btoa(`${user.username}:${user.password}}
  //   }



  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function For adding new row object
  const handleAdd = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 100, title: "",
        alltext: "", summary: "",
        imageurl: "", authorid: ""
      },
    ]);
  console.log(authbasic);

    fetch('https://Server.alexyu22.repl.co/api/v1/articles', {
      method: 'POST',
      body: JSON.stringify({
        id: rows.length + 100, title: "",
        alltext: "", summary: "",
        imageurl: "", authorid: ""
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        // For you TODO: display success message and/or redirect
        console.log(data);
        //     alert(`Registration Completed! Pls. press login or green button to continue `)
      })
      .catch(errorResponse => {
        // For you TODO: show nicely formatted error message and clear form
        console.error(errorResponse);
        alert(`Error: ${errorResponse}`);
      });

    setEdit(true);
  };

  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will 
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  // Function to handle save
  const handleSave = () => {
    setEdit(!isEdit);
    setRows(rows);
    console.log("saved : ", rows);
    setDisable(true);
    setOpen(true);
    console.log('handleSave called');
    console.log((rows));




  }

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes 
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;

    console.log(JSON.stringify(list[index]));

    console.log('https://Server.alexyu22.repl.co/api/v1/articles/' + list[index]['id']);

    fetch('https://Server.alexyu22.repl.co/api/v1/articles/' + list[index]['id'], {
      method: 'PUT',
      body: JSON.stringify(list[index]),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        // For you TODO: display success message and/or redirect
        console.log(data);
        //     alert(`Registration Completed! Pls. press login or green button to continue `)
      })
      .catch(errorResponse => {
        // For you TODO: show nicely formatted error message and clear form
        console.error(errorResponse);
        alert(`Error: ${errorResponse}`);
      });


    setRows(list);

    //console.log('handleInputChange called');
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(true);
    // console.log('handleConfirm called');
  };

  // Handle the case of delete confirmation where 
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (i) => {
    // const newlist = [...rows];
    // newlist.splice(i, 1);
    // console.log(newlist);
    // setRows(newlist);
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation 
  // where user click no 
  const handleNo = () => {
    setShowConfirm(false);
  };



  return (
    <TableBody>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Record saved successfully!
        </Alert>
      </Snackbar>
      <Box margin={1}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {isEdit ? (
              <div>
                <Button onClick={handleAdd}>
                  <AddBoxIcon onClick={handleAdd} />
                  ADD
                </Button>
                {rows.length !== 0 && (
                  <div>
                    {disable ? (
                      <Button disabled align="right" onClick={handleSave}>
                        <DoneIcon />
                        SAVE
                      </Button>
                    ) : (
                        <Button align="right" onClick={handleSave}>
                          <DoneIcon />
                          SAVE
                      </Button>
                      )}
                  </div>
                )}
              </div>
            ) : (
                <div>
                  <Button onClick={handleAdd}>
                    <AddBoxIcon onClick={handleAdd} />
                    ADD
                </Button>
                  <Button align="right" onClick={handleEdit}>
                    <CreateIcon />
                    EDIT
                </Button>
                </div>
              )}
          </div>
        </div>
        <TableRow align="center"> </TableRow>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>title</TableCell>
              <TableCell>summary</TableCell>
              <TableCell>alltext</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <div>
                  <TableRow key={row.id}>
                    {isEdit ? (
                      <div>
                        <TableCell padding="none">
                          <input
                            value={row.title}
                            name="title"

                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <input
                            value={row.summary}
                            name="summary"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <select
                            style={{ width: "100px" }}
                            name="alltext"
                            value={row.alltext}
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option value=""></option>
                            <option value="adopted">adopted</option>
                            <option value="adopt">adopt</option>
                            <option value="special">special</option>

                          </select>
                        </TableCell>
                         <TableCell padding="none">
                          <input
                            value={row.imageurl}
                            name="imageurl"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                      </div>
                    ) : (
                        <div>
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.summary}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {row.alltext}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            align="center"
                          ></TableCell>
                        </div>
                      )}
                    {isEdit ? (
                      <Button className="mr10" onClick={handleConfirm}>
                        <ClearIcon />
                      </Button>
                    ) : (
                        <Button className="mr10" onClick={handleConfirm}>
                          <DeleteOutlineIcon />
                        </Button>
                      )}
                    {showConfirm && (
                      <div>
                        <Dialog
                          open={showConfirm}
                          onClose={handleNo}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Confirm Delete"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure to delete
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => handleRemoveClick(i)}
                              color="primary"
                              autoFocus
                            >
                              Yes
                            </Button>
                            <Button
                              onClick={handleNo}
                              color="primary"
                              autoFocus
                            >
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    )}
                  </TableRow>
                </div>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </TableBody>
  );

}

export default TableDemo;