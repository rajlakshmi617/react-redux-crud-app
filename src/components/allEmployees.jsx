import React, { Component } from "react";
import EmployeeComponent from "./employeeComponent";
import { Card } from "reactstrap";
import { connect } from "react-redux";

class AllEmployees extends Component {
  render() {
    if (this.props.emplist.length) {
      return (
        <React.Fragment>
          <div className="col-12 m-3 font-weight-lighter text-center">
            <h4>All Employee List</h4>
            {this.props.emplist.map(emp => {
              return <EmployeeComponent emp={emp} key={emp.id} />;
            })}
          </div>
        </React.Fragment>
      );
    } else {
      return (<Card className="m-1 text-center"><h4>No Data Found</h4></Card>)
    }

  }
}

const mapStateToProps = state => {
  return {
    emplist: state
  };
};

export default connect(mapStateToProps)(AllEmployees);
