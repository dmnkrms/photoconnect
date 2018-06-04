import React from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "./TextFieldGroup";

const ModelDetails = ({ height, onChange, agency, gender }) => {
  const maleChecked = () => {
    if (gender === "Male") {
      return "checked";
    } else {
      return "";
    }
  };
  const femaleChecked = () => {
    if (gender === "Female") {
      return "checked";
    } else {
      return "";
    }
  };
  return (
    <div className="card card-body mb-3">
      <div className="col-12 ">
        <p className="h5 text-muted">Detailed information</p>
        <br />
        <div className="row h5">
          Your gender:
          <label className="radio-inline ml-4">
            <input
              checked={maleChecked()}
              type="radio"
              name="gender"
              value="Male"
              onChange={onChange}
            />{" "}
            Male <i className="fas fa-mars" />
          </label>
          <label className="radio-inline ml-4">
            <input
              checked={femaleChecked()}
              type="radio"
              name="gender"
              value="Female"
              onChange={onChange}
            />{" "}
            Female <i className="fas fa-venus" />
          </label>
        </div>
        <div className="row h5">
          <TextFieldGroup
            value={height}
            info="Your height"
            type="number"
            placeholder="Height in centimeters"
            name="height"
            onChange={onChange}
          />
        </div>
        <div className="row h5">
          <TextFieldGroup
            value={agency}
            type="text"
            placeholder="Agency"
            name="agency"
            onChange={onChange}
            info="Plese specify agency if you work for one"
          />
        </div>
      </div>
    </div>
  );
};

ModelDetails.propTypes = {
  onChange: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  agency: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired
};

export default ModelDetails;
