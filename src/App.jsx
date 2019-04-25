import React from "react";
import AddEmployee from "./components/addEmployee";
import AllEmployees from "./components/allEmployees";
import { Card } from "reactstrap";

class App extends React.Component {
  state = {};
  render() {
    return (
      <div className="container">
        <Card className="m-3">
          <div className="col-12">
            <AddEmployee />
          </div>
        </Card>

        <Card className="m-3">
          <div className="col-12">
            <AllEmployees />
          </div>
        </Card>
      </div>
    );
  }
}

export default App;
