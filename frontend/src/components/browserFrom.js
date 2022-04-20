import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  addBookmark,
  deleteBookmark,
  getBookmark,
  updateBookmark,
} from "../actions/bookmark";

export const BrowserFrom = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [bookmark, setBookmark] = useState([]);

  const formValue = {
    title: "",
    description: "",
    price: Number,
  };

  const _getBookmark = () => {
    getBookmark().then((data) => {
      setBookmark(data);
    });
  };

  const _deleteBookmark = (id) => {
    let list = bookmark.filter((item) => item._id !== id);
    deleteBookmark(id).then((data) => {
      console.log("item deleted");
    });
    setBookmark(list);
  };

  useEffect(() => {
    _getBookmark();
  }, []);

  const handleBookmarkSubmit = async (
    values,
    resetForm,
    setErrors,
    setStatus
  ) => {
    console.log("log: values", values);
    try {
      const data = await addBookmark(
        values.title,
        values.description,
        values.price
      );

      if (data) {
        const temp = [...bookmark, data];
        setBookmark(temp);
      }
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async (
    values,
    resetForm,
    setErrors,
    setStatus
  ) => {
    try {
      const data = await updateBookmark(
        values.title,
        values.description,
        values.price
      );

      if (data) {
        const temp = [...bookmark, data];
        setBookmark(temp);
      }
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container className="mt-5 bg-success">
        <Grid>
          <Typography variant="h3" className="bg-danger text-center mb-2">
            Input Form
          </Typography>
          <Grid container spacing={4} className="mt-2">
            <Grid item xs={6} className="text-center  bg-white ">
              <Formik
                initialValues={formValue}
                onSubmit={async (
                  values,
                  { resetForm, setErrors, setStatus }
                ) => {
                  await handleBookmarkSubmit(
                    values,
                    resetForm,
                    setErrors,
                    setStatus
                  );
                }}
              >
                {({ values, handleChange, handleSubmit }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        onChange={handleChange}
                        variant="standard"
                        label="Title"
                        type="text"
                        value={values.title}
                        name="title"
                      />{" "}
                      <br />
                      <TextField
                        onChange={handleChange}
                        variant="standard"
                        label="Description"
                        type="text"
                        value={values.description}
                        name="description"
                      />
                      <br />
                      <TextField
                        onChange={handleChange}
                        variant="standard"
                        label="Price"
                        type="number"
                        value={values.price}
                        name="price"
                      />{" "}
                      <br />
                      <Button
                        variant="outlined"
                        className="mt-3 mb-2"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </form>
                  );
                }}
              </Formik>
            </Grid>
            <Grid item xs={6} className="mt-2">
              <Card>
                <Table>
                  <TableHead className="bg-danger">
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  {bookmark.map((value) => {
                    return (
                      <TableBody>
                        <TableCell>{value.title}</TableCell>
                        <TableCell>{value.description}</TableCell>
                        <TableCell>{value.price}</TableCell>
                        <TableCell>
                          <Button
                            className="w-50 mb-2"
                            onClick={handleClickOpen}
                          >
                            Edit
                          </Button>
                          <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Update</DialogTitle>
                            <DialogContent>
                              <Formik
                                initialValues={formValue}
                                onSubmit={async (
                                  values,
                                  { resetForm, setErrors, setStatus }
                                ) => {
                                  await handleUpdateSubmit(
                                    values,
                                    resetForm,
                                    setErrors,
                                    setStatus
                                  );
                                }}
                              >
                                {({ values, handleChange, handleSubmit }) => {
                                  return (
                                    <form onSubmit={handleSubmit}>
                                      <TextField
                                        onChange={handleChange}
                                        variant="standard"
                                        label="Title"
                                        type="text"
                                        value={values.title}
                                        name="title"
                                      />{" "}
                                      <br />
                                      <TextField
                                        onChange={handleChange}
                                        variant="standard"
                                        label="Description"
                                        type="text"
                                        value={values.description}
                                        name="description"
                                      />
                                      <br />
                                      <TextField
                                        onChange={handleChange}
                                        variant="standard"
                                        label="Price"
                                        type="number"
                                        value={values.price}
                                        name="price"
                                      />{" "}
                                      <br />
                                      <DialogActions>
                                        <Button
                                          variant="outlined"
                                          onClick={handleClose}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="contained"
                                          type="submit"
                                          onClick={handleClose}
                                        >
                                          Update
                                        </Button>
                                      </DialogActions>
                                    </form>
                                  );
                                }}
                              </Formik>
                            </DialogContent>
                          </Dialog>
                          <Button
                            onClick={() => {
                              _deleteBookmark(value._id);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableBody>
                    );
                  })}
                </Table>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default BrowserFrom;
