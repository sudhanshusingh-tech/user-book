import React, { Component } from "react";
import { Modal as M } from "react-bootstrap";
import errorPng from "../error.png";

export default class Modal extends Component {
  render() {
    return (
      <>
        <M show={this.props.show} onHide={this.props.onClose}>
          <M.Header closeButton>
            <M.Title>
              {this.props.state.updateTrigger === true
                ? "Update User Detail"
                : "Add User Details"}
            </M.Title>
          </M.Header>
          <M.Body>
            <form action="">
              <div>
                <div className="form-group col mt-2">
                  <label className="">
                    Name<small className="text-danger">*</small>
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="inputStyle"
                    onChange={(e) => {
                      this.props.handleChange(e);
                    }}
                    onBlur={(e) => {
                      this.props.handleChange(e);
                    }}
                    defaultValue={this.props.state.name}
                  />
                  <span className="text-danger">
                    {this.props.state.name_error}
                  </span>
                </div>
                <div className="form-group col mt-2">
                  <label className="form-control-label">
                    Employee ID<small className="text-danger">*</small>
                  </label>
                  <input
                    required
                    type="tel"
                    className="inputStyle"
                    name="empid"
                    id="empid"
                    minLength="7"
                    onChange={(e) => {
                      this.props.handleChange(e);
                    }}
                    onBlur={(e) => {
                      this.props.handleChange(e);
                    }}
                    defaultValue={this.props.state.empid}
                  />
                  <span className="text-danger">
                    {this.props.state.empid_error}
                  </span>
                </div>
                <div className="form-group col mt-2">
                  <label className="">
                    Email<small className="text-danger">*</small>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="inputStyle"
                    onChange={(e) => {
                      this.props.handleChange(e);
                    }}
                    onBlur={(e) => {
                      this.props.handleChange(e);
                    }}
                    defaultValue={this.props.state.email}
                  />
                  <span className="text-danger">
                    {this.props.state.email_error}
                  </span>
                </div>
                <div className="form-group col mt-2">
                  <label className="form-control-label">
                    Mobile<small className="text-danger">*</small>
                  </label>
                  <input
                    required
                    type="tel"
                    className="inputStyle"
                    name="mobile"
                    id="mobile"
                    minLength="10"
                    onChange={(e) => {
                      this.props.handleChange(e);
                    }}
                    onBlur={(e) => {
                      this.props.handleChange(e);
                    }}
                    defaultValue={this.props.state.mobile}
                  />
                  <span className="text-danger">
                    {this.props.state.mobile_error}
                  </span>
                </div>
                <div className="form-group col mt-2">
                  <label className="form-control-label"> City </label>
                  <input
                    required
                    type="text"
                    className="inputStyle"
                    name="city"
                    id="city"
                    onChange={(e) => {
                      this.props.handleChange(e);
                    }}
                    onBlur={(e) => {
                      this.props.handleChange(e);
                    }}
                    defaultValue={this.props.state.city}
                  />
                  <span className="text-danger">
                    {this.props.state.city_error}
                  </span>
                </div>
                <div className="form-group col mt-2">
                  <label className="form-control-label"> State </label>
                  <input
                    required
                    type="text"
                    className="inputStyle"
                    name="states"
                    id="states"
                    onChange={(e) => {
                      this.props.handleChange(e);
                    }}
                    onBlur={(e) => {
                      this.props.handleChange(e);
                    }}
                    defaultValue={this.props.state.states}
                  />
                  <span className="text-danger">
                    {this.props.state.states_error}
                  </span>
                </div>
                <div
                  className="form-group col pt-3 "
                  style={{ float: "right" }}
                >
                  <button
                    type="submit"
                    onClick={(e) => this.props.handleSave(e)}
                    className="btn btn-block btn-success m-2"
                  >
                    {this.props.state.updateTrigger === true ? "Update" : "Add"}
                  </button>
                  <button
                    type="reset"
                    onClick={this.props.handleClear}
                    className="btn btn-block btn-danger"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </M.Body>
        </M>

        <M
          show={this.props.state.deleteModal}
          onHide={this.props.onCloseDelete}
        >
          <M.Header closeButton>
            <M.Title>Do you want to delete this user?</M.Title>
          </M.Header>
          <M.Body>
            <form action="">
              <div className="form-group col pt-3 " style={{ float: "right" }}>
                <button
                  type="submit"
                  onClick={(e) => {
                    this.props.handleDelete(e);
                  }}
                  className="btn btn-block btn-danger m-2"
                >
                  Yes
                </button>
                <button
                  type="reset"
                  onClick={this.props.onCloseDelete}
                  className="btn btn-block btn-success"
                >
                  No
                </button>
              </div>
            </form>
          </M.Body>
        </M>

        <M show={this.props.showModal} onHide={this.props.closeMessageModal}>
          <M.Header closeButton>
            <M.Title></M.Title>
          </M.Header>
          <M.Body>
            <div className="thank-you-pop">
              {this.props.state.errorFlag ? (
                <>
                  <img src={errorPng} alt="" />
                  <h1>Oops!</h1>
                </>
              ) : (
                <>
                  <img
                    src="http://goactionstations.co.uk/wp-content/uploads/2017/03/Green-Round-Tick.png"
                    alt=""
                  />
                  <h1>Thank You!</h1>
                </>
              )}

              <p>{this.props.state.message}</p>
            </div>
          </M.Body>
        </M>
      </>
    );
  }
}
