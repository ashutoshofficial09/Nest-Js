import {
  Button,
  Container,
  Grid,
  InputAdornment,
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
import { addExpense, deleteExpense, getExpense } from "../actions/expensem";

function Expense() {
  const [expense, setExpense] = useState([]);
  // const [total, setTotal] = useState("");

  const handleIncrementClick = (id) => {
    let index = expense.findIndex((i) => i._id === id);
    console.log("Increment clicked");
    console.log(id);
    console.log(index);
    let temp = [...expense];
    let price = temp[index].price / temp[index].quantity;
    temp[index].quantity = temp[index].quantity + 1;
    temp[index].price = price + temp[index].price;
    setExpense(temp);
  };
  const handleDecrementClick = (id) => {
    let index = expense.findIndex((i) => i._id === id);
    console.log("Decrement clicked");
    console.log(id);
    console.log(index);
    let temp = [...expense];

    if (temp[index].quantity > 1) {
      let price = temp[index].price / temp[index].quantity;
      temp[index].quantity = temp[index].quantity - 1;

      temp[index].price = temp[index].price - price;
      setExpense(temp);
    } else {
      _deleteExpense(id);
    }
  };
  // const resetCount = () => {
  //   setcount(0);
  // };

  // const dispatch = useDispatch();
  // //handle increment function
  // const handleInc = () => {
  //   expense.map((value) => {
  //     inc = value.quantity;
  //     setInc = value.qunatity + 1;
  //   });
  // };

  const expenseForm = {
    item: "",
    quantity: "",
    price: "",
  };

  const _getExpense = () => {
    getExpense().then((data) => {
      setExpense(data);
    });
  };
  useEffect(() => {
    _getExpense();
  }, []);

  const handleExpenseSubmit = async (
    values,
    resetForm,
    setErrors,
    setStatus
  ) => {
    console.log("log: values", values);
    try {
      const data = await addExpense(values.item, values.quantity, values.price);

      if (data) {
        const temp = [...expense, data];
        setExpense(temp);
      }
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const _deleteExpense = (id) => {
    let list = expense.filter((item) => item._id !== id);
    deleteExpense(id).then((data) => {
      console.log("item deleted");
    });
    setExpense(list);
  };
  return (
    <div>
      <Container>
        <Grid style={{ backgroundColor: "#10482475" }}>
          <Typography className="text-center mb-2" variant="h2">
            Expense Manager
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Formik
                initialValues={expenseForm}
                onSubmit={async (
                  values,
                  { resetForm, setErrors, setStatus }
                ) => {
                  await handleExpenseSubmit(
                    values,
                    resetForm,
                    setErrors,
                    setStatus
                  );
                }}
              >
                {({ values, handleChange, handleSubmit }) => {
                  return (
                    <form className="text-center" onSubmit={handleSubmit}>
                      <TextField
                        onChange={handleChange}
                        value={values.item}
                        className="mb-2"
                        type="text"
                        name="item"
                        variant="standard"
                        label="Item Name"
                      ></TextField>{" "}
                      <br />
                      <TextField
                        onChange={handleChange}
                        value={values.quantity}
                        className="mb-2"
                        type="number"
                        name="quantity"
                        variant="standard"
                        label="Qunatity"
                      ></TextField>
                      <br />
                      <TextField
                        onChange={handleChange}
                        value={values.price}
                        className="mb-2"
                        type="number"
                        name="price"
                        variant="standard"
                        label="Price"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              &#8377;
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                      <br />
                      <Button
                        type="submit"
                        className="mb-2 mr-2"
                        variant="outlined"
                      >
                        {" "}
                        Add{" "}
                      </Button>
                    </form>
                  );
                }}
              </Formik>
            </Grid>

            <Grid item xs={6}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> Item Name </TableCell>
                    <TableCell> Qunatity </TableCell>
                    <TableCell> Price </TableCell>
                    <TableCell> Action </TableCell>
                  </TableRow>
                </TableHead>

                {expense.map((value) => {
                  return (
                    <TableBody>
                      <TableRow>
                        <TableCell> {value.item} </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDecrementClick(value._id)}
                          >
                            -
                          </Button>{" "}
                          {value.quantity}
                          <Button
                            onClick={() => handleIncrementClick(value._id)}
                          >
                            +
                          </Button>
                        </TableCell>
                        <TableCell> {value.price} </TableCell>
                        {/* for testing id <TableCell> {value._id} </TableCell> */}
                        <TableCell>
                          <Button
                            onClick={() => {
                              _deleteExpense(value._id);
                            }}
                            variant="outlined"
                            color="error"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
                <TextField
                  disabled
                  label="Total"
                  variant="standard"
                ></TextField>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Expense;
