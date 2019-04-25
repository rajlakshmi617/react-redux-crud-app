import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { connect } from "react-redux";
import { addEmployee, updateEmployeeData } from "../actions/actions";
class AddEmployee extends Component {
  state = {
    id: "",
    empname: "",
    address: "",
    salary: ""
  };

  checkErrorObj = (obj) => {
    let isError = false;
    for (var prop in obj) {
      // console.log(obj[prop]);
      if (obj[prop] !== "") {
        isError = true;
      }
    }
    return isError;
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.error && Object.keys(this.state.error).length > 0 && this.checkErrorObj(this.state.error)) {
      alert('Form has errors');
    } else {
      if (this.state.id && !this.state.erS) {
        if (this.state.edit) {
          this.state["edit"] = false;
          this.props.dispatch(updateEmployeeData(this.state));
        } else {
          this.state["edit"] = false;
          this.props.dispatch(addEmployee(this.state));
        }
        this.setState({
          id: "",
          empname: "",
          address: "",
          salary: ""
        });
      }
    }
  };
  componentWillReceiveProps(state) {
    if (Array.isArray(state.data) && state.data.length) {
      return state.data[0].edit ? this.setState({ ...state.data[0] }) : null;
    }
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleValidation(event, onSubmit = false) {
    if (onSubmit) {
    } else {
      let errorData;
      const { name, value } = event.target;
      switch (name) {
        case "id":
          // console.log("in id validate");
          errorData = this.isRequired(name, value);
          break;

        case "empname":
          console.log("in empname validate");
          errorData = this.isRequired(name, value);
          if (!errorData) {
            errorData =
              value.length < 20 ? "" : `${name} should be less than 20 chars`;
          } else {
            this.removeErrordata(name);
          }
          break;
        case "salary":
          // console.log("in salary validate");
          errorData = this.isRequired(name, value);
          if (!errorData) {
            errorData =
              value > 1 && value < 70000
                ? ""
                : `${name} should be number and b/w 0 to 70k`;
          } else {
            this.removeErrordata(name);
          }
          break;
        case "address":
          // console.log("in address validate");
          errorData = this.isRequired(name, value);
          if (!errorData) {
            errorData =
              value.length < 50 ? "" : `${name} should be less than 50 chars`;
          } else {
            this.removeErrordata(name);
          }
          break;
        default:
          this.setState({ error: {} });
          break;
      }

      if (errorData) {
        let allError = this.state.error || {};
        this.setState({
          error: { ...allError, [event.target.name]: errorData }
        });
      }
    }
  }
  isRequired(name, value) {
    if (!value) {
      return `${name} is Required`;
    }
    this.removeErrordata(name);
  }
  removeErrordata(name) {
    const allError = this.state.error;
    if (allError && name in allError) {
      this.setState({ error: { ...allError, [name]: "" } })
    } else {
      return null;
    }

  }
  checkError(nameOfElement) {
    if (this.state.error && nameOfElement in this.state.error) {
      return this.state.error[nameOfElement] ? (
        <Alert className="m-1" color="danger">
          {this.state.error[nameOfElement]}
        </Alert>
      ) : (
          ""
        );
    }
  }
  render() {
    const editMode =
      this.props.data && this.props.data.length && "edit" in this.props.data[0]
        ? this.props.data[0].edit
        : false;

    return (
      <Form className="m-4" onSubmit={this.handleSubmit}>
        <div className="col-12 m-3 font-weight-lighter text-center">
          <h4>{editMode ? "Update Employee" : "Add Employee"}</h4>
        </div>
        {this.state.error ? "Please Correct incorrect inputs" : null}
        <FormGroup>
          <Input
            value={this.state.id}
            onChange={this.handleChange}
            onBlur={event => this.handleValidation(event)}
            type="text"
            name="id"
            readOnly={editMode}
            placeholder="Enter ID"
          />
          {this.checkError("id")}
        </FormGroup>
        <FormGroup>
          <Input
            value={this.state.empname}
            onChange={this.handleChange}
            onBlur={event => this.handleValidation(event)}
            type="text"
            name="empname"
            placeholder="Enter Name"
          />
          {this.checkError("empname")}
        </FormGroup>
        <FormGroup>
          <Input
            value={this.state.address}
            onChange={this.handleChange}
            onBlur={event => this.handleValidation(event)}
            type="textarea"
            name="address"
            placeholder="Enter add"
          />
          {this.checkError("address")}
        </FormGroup>
        <FormGroup>
          <Input
            value={this.state.salary}
            onChange={this.handleChange}
            onBlur={event => this.handleValidation(event)}
            type="text"
            name="salary"
            placeholder="Enter Salary"
          />
          {this.checkError("salary")}
        </FormGroup>
        <div className="row text-center">
          <Button color="primary" className="mx-auto">
            {editMode ? "Update" : "Submit"}
          </Button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  if (Array.isArray(state) && state.length) {
    const data = state.filter(e => e.edit);
    console.log("ddd", data);
    return {
      data: data
    };
  } else {
    return {
      data: state
    };
  }
};

// const mapDispatchToProps = { increment, decrement, reset }

export default connect(mapStateToProps)(AddEmployee);
