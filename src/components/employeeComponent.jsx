import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "reactstrap";
import { deleteEmployee, editEmployee } from "../actions/actions";
class EmployeeComponent extends Component {
  render() {
    console.log(this.props);
    return (
      <Card className="m-1">
        <div className="row font-weight-bold p-2 m-2">
          <div className="col-3">{this.props.emp.empname}</div>
          <div className="col-3">{this.props.emp.address}</div>
          <div className="col-2">{this.props.emp.salary}</div>
          <div className="col-1">
            <Button
              color="primary"
              className="button3"
              onClick={() =>
                this.props.dispatch(editEmployee(this.props.emp.id))
              }
            >
              Edit
            </Button>
          </div>
          <div className="col-1">
            <Button
              onClick={() =>
                this.props.dispatch(deleteEmployee(this.props.emp.id))
              }
              color="danger"
              className="button3"
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}

export default connect()(EmployeeComponent);
