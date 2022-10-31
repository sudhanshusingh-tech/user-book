import { React, Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; // Without this bootstrap won't work in project
import Modal from "./components/Modal";
import UserTable from "./components/UserTable";
import {
  ValidateCity,
  ValidateEmail,
  ValidateEmployeeId,
  ValidateMobile,
  ValidateName,
  ValidateState,
} from "./components/Validation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, // For Modal toggle
      users: [], // List of users
      name: "", // State to handle each name from users while accessing or modyfing
      email: "", // State to handle each email from users while accessing or modyfing
      empid: "", // State to handle each empid from users while accessing or modyfing
      mobile: "", // State to handle each mobile from users while accessing or modyfing
      city: "", // State to handle each city from users while accessing or modyfing
      states: "", // State to handle each state from users while accessing or modyfing
      name_error: "",
      email_error: "",
      empid_error: "",
      mobile_error: "",
      city_error: "",
      states_error: "",
      updateTrigger: false,
      deleteModal: false,
      messageModal: false,
    };
  }

  componentDidMount() {
    fetch("https://user-book.onrender.com/users")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
        }
      })
      .then((data) => {
        this.setState({
          users: data,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const updateAppState = async (messageModal, errorFlag, message) => {
      await this.setState({ messageModal, errorFlag, message });
    };

    const handleSave = (e) => {
      if (
        !this.state.name_error &&
        !this.state.mobile_error &&
        !this.state.empid_error &&
        !this.state.email_error
      ) {
        var newEntry = {
          name: this.state.name,
          mobile: this.state.mobile,
          empid: this.state.empid,
          email: this.state.email,
          city: this.state.city,
          state: this.state.states,
        };
        if (this.state.updateTrigger === true) {
          e.preventDefault();
          fetch(
            "https://user-book.onrender.com/users/" +
              this.state.idForManipulation,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newEntry),
            }
          )
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                updateAppState(true, false, "Something went wrong");
              }
            })
            .then((data) => {
              if (data.error) {
                updateAppState(true, true, data.error);
              } else {
                this.setState({ show: false, updateTrigger: false });
                updateAppState(true, false, "User Updated Successfully");
                this.componentDidMount();
              }
            })
            .catch((error) => console.error(error));
        } else {
          e.preventDefault();
          fetch("https://user-book.onrender.com/users/addNewUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntry),
          })
            .then((res) => {
              if (res.ok) {
                updateAppState(true, false, "User Added Successfully");
                this.setState({ show: false });
                this.componentDidMount();
              } else {
                res.text().then((text) => {
                  let errorJson = JSON.parse(text);
                  updateAppState(true, true, errorJson.error);
                });
              }
            })
            .catch((error) => console.log("Caught" + error));
        }
      } else {
        e.preventDefault();
        updateAppState(true, true, "Fill All Details Properly");
      }
      setTimeout(() => {
        updateAppState(false, false, "");
      }, 2000);
    };

    const handleClear = () => {
      this.setState({
        name: "", // State to handle each name from users while accessing or modyfing
        email: "", // State to handle each email from users while accessing or modyfing
        empid: "", // State to handle each empid from users while accessing or modyfing
        mobile: "", // State to handle each mobile from users while accessing or modyfing
        city: "", // State to handle each city from users while accessing or modyfing
        states: "", // State to handle each state from users while accessing or modyfing
        name_error: "",
        email_error: "",
        empid_error: "",
        mobile_error: "",
        city_error: "",
        states_error: "",
      });
    };

    const updateUser = (id) => {
      var userArray = this.state.users; // To get all details of specific id
      userArray.forEach((e) => {
        if (e._id === id) {
          this.setState({
            show: true,
            updateTrigger: true,
            name: e.name,
            email: e.email,
            mobile: e.mobile,
            empid: e.empid,
            city: e.city,
            states: e.state,
            idForManipulation: e._id,
          });
        }
      });
    };

    const deleteUser = (id) => {
      var userArray = this.state.users; // To get all details of specific id
      userArray.forEach((e) => {
        if (e._id === id) {
          this.setState({
            deleteModal: true,
            idForManipulation: e._id,
          });
        }
      });
    };

    const handleDelete = (e) => {
      e.preventDefault();
      fetch(
        "https://user-book.onrender.com/users/" + this.state.idForManipulation,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ softDelete: 1 }),
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
          else {
            updateAppState(true, false, "Something went wrong");
          }
        })
        .then(async (data) => {
          if (data.error) updateAppState(true, false, data.error);
          else {
            this.setState({
              deleteModal: false,
            });
            updateAppState(true, false, "User Deleted Successfully");
          }
        })
        .catch((error) => console.error(error));
      setTimeout(() => {
        updateAppState(false, false, "");
        this.componentDidMount();
      }, 2000);
    };

    const handleChange = async (e) => {
      let { name, value } = e.target;
      await this.setState({ ...this.state, [name]: value });
      if (name === "name") {
        this.setState({
          ...this.state,
          name_error: ValidateName(e),
        });
      } else if (name === "mobile") {
        this.setState({
          ...this.state,
          mobile_error: ValidateMobile(e),
        });
      } else if (name === "empid") {
        this.setState({
          ...this.state,
          empid_error: ValidateEmployeeId(e),
        });
      } else if (name === "city") {
        this.setState({
          ...this.state,
          city_error: ValidateCity(e),
        });
      } else if (name === "states") {
        this.setState({
          ...this.state,
          states_error: ValidateState(e),
        });
      } else if (name === "email") {
        this.setState({
          ...this.state,
          email_error: ValidateEmail(e),
        });
      }
    };
    return (
      <>
        <div className="App-header">
          <h2>User Book</h2>
        </div>
        <div className="addButton">
          <button
            onClick={async () => await this.setState({ show: true })}
            type="button"
            className="btn btn-sm btn-primary"
          >
            Add User
          </button>
        </div>
        <Modal
          show={this.state.show}
          onClose={async () => {
            await this.setState({ show: false, updateTrigger: false });
            handleClear();
          }}
          onCloseDelete={async () =>
            await this.setState({
              deleteModal: false,
            })
          }
          handleChange={handleChange}
          handleClear={handleClear}
          state={this.state}
          handleSave={handleSave}
          handleDelete={handleDelete}
          showModal={this.state.messageModal}
          closeMessageModal={async () =>
            await this.setState({
              messageModal: false,
            })
          }
          updateAppState={updateAppState}
        />
        <UserTable
          state={this.state}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      </>
    );
  }
}

export { App };
