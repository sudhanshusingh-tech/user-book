import React, { Component } from "react";

export default class UserTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var content = "";
    content = this.props.state.users.map((eachUser, index) => {
      if (eachUser.softDelete === 0) {
        return (
          <tr key={index}>
            <td>{eachUser.empid}</td>
            <td>{eachUser.name}</td>
            <td>{eachUser.email}</td>
            <td>{eachUser.mobile}</td>
            <td>{eachUser.city}</td>
            <td>{eachUser.state}</td>
            <td>
              <div
                className="d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <button
                  type="button"
                  className="btn btn-sm btn-warning"
                  style={{ fontSize: "10px" }}
                  id={eachUser._id}
                  onClick={() => {
                    this.props.updateUser(eachUser._id);
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  style={{ fontSize: "10px" }}
                  onClick={() => this.props.deleteUser(eachUser._id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        );
      }
    });
    return (
      <table
        className="table table-light table-bordered table-hover caption-top"
        style={{ margin: "auto", width: "1000px", textAlign: "center" }}
      >
        <caption>List of users</caption>
        <thead className="table-info">
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
            <th>State</th>
            <th style={{ width: "15%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    );
  }
}
