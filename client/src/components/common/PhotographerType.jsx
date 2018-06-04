import React from "react";
import PropTypes from "prop-types";

const PhotographerType = ({ onChange }) => {
  return (
    <div className="card card-body mb-3">
      <div className="col-12 ">
        <p className="h5 text-muted">What is your speciality?</p>
        <br />
        <label className="checkbox-inline mr-3">
          <input
            type="checkbox"
            name="portrait"
            value="Portrait"
            onChange={onChange}
          />{" "}
          Portrait
        </label>
        <label className="checkbox-inline mr-3">
          <input
            type="checkbox"
            name="landsacpe"
            value="Landscape"
            onChange={onChange}
          />{" "}
          Landscape
        </label>
        <label className="checkbox-inline mr-3">
          <input
            type="checkbox"
            name="aerial"
            value="Aerial"
            onChange={onChange}
          />{" "}
          Aerial
        </label>
        <label className="checkbox-inline mr-3">
          <input
            type="checkbox"
            name="architecture"
            value="Architecture"
            onChange={onChange}
          />{" "}
          Architecture
        </label>
        <label className="checkbox-inline mr-3">
          <input
            type="checkbox"
            name="fashion"
            value="Fashion"
            onChange={onChange}
          />{" "}
          Fashion
        </label>
        <label className="checkbox-inline mr-3">
          <input type="checkbox" name="food" value="Food" onChange={onChange} />{" "}
          Food
        </label>
        <label className="checkbox-inline mr-3">
          <input
            type="checkbox"
            name="sport"
            value="Sport"
            onChange={onChange}
          />{" "}
          Sport
        </label>
        <label className="checkbox-inline mr-3">
          <input
            type="checkbox"
            name="street"
            value="Street"
            onChange={onChange}
          />{" "}
          Street
        </label>
        <label className="checkbox-inline mr-3">
          <input
            type="checkbox"
            name="wildlife"
            value="Wildlife"
            onChange={onChange}
          />{" "}
          Wildlife
        </label>
        <label className="checkbox-inline mr-3">
          <input
            type="checkbox"
            name="commercial"
            value="Commercial"
            onChange={onChange}
          />{" "}
          Commercial
        </label>
      </div>
    </div>
  );
};

PhotographerType.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default PhotographerType;
