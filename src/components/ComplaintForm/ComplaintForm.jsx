import "./complaintForm.scss";
import customerImg from "../../assets/img/customer.jpeg";
import StarRating from "../starRating/StarRating";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ComplaintForm() {
  const [value, setValue] = useState();

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    navigate("/adminview");

    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/complaints",
        formData
      );
      console.log("Complaint submitted successfully:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error submitting complaint:", error);
      throw error;
    }
  };

  return (
    <main className="wrapper">
      <section className="wrapper_complaintForm">
        <div className="wrapper_complaintForm_title">
          <h1>Customer Complaint Form</h1>
          <div className="wrapper_complaintForm_title_img">
            <img src={customerImg} alt="customerImg" />
          </div>
          <p className="wrapper_complaintForm_title_desc">
            Do you have a complaint?
          </p>
        </div>
        <form className="wrapper_complaintForm_form" onSubmit={handleSubmit}>
          <div className="wrapper_complaintForm_form_desing">
            <label className="wrapper_complaintForm_form_design_content">
              Title*:
            </label>
            <br />
            <input
              className="wrapper_complaintForm_form_design_input"
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              value={formData.title}
              required
            />
          </div>
          <div className="wrapper_complaintForm_form_desing">
            <label className="wrapper_complaintForm_form_design_content">
              Name*:
            </label>
            <br />

            <input
              className="wrapper_complaintForm_form_design_input"
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          <div className="wrapper_complaintForm_form_desing">
            <label className="wrapper_complaintForm_form_design_content">
              Email*:
            </label>
            <br />
            <input
              className="wrapper_complaintForm_form_design_input"
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="wrapper_complaintForm_form_desing">
            <label className="wrapper_complaintForm_form_design_content">
              Phone*:
            </label>
            <br />
            <PhoneInput
              className="wrapper_complaintForm_form_design_input phoneInput"
              value={value}
              onChange={setValue}
            />

            {/* <input className="wrapper_complaintForm_form_design_input" type="tel" id="phone" name="phone"  required /> */}
          </div>
          <div className="wrapper_complaintForm_form_desing">
            <label className="wrapper_complaintForm_form_design_content">
              Address:
            </label>
            <br />
            <input
              className="wrapper_complaintForm_form_design_input"
              type="address"
              id="address"
              name="address"
              onChange={handleChange}
              value={formData.address}
              required
            />
          </div>
          <div className="wrapper_complaintForm_form_desing">
            <label className="wrapper_complaintForm_form_design_content">
              Problem Description*
            </label>
            <textarea
              className="wrapper_complaintForm_form_design_message"
              name="message"
              id="message"
              cols="105"
              rows="10"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <div>
              <label className="wrapper_complaintForm_form_design_content">
                Rating:{" "}
              </label>
              <StarRating />
            </div>
          </div>
          <div className="wrapper_complaintForm_form_submitBtn">
            <button
              className="wrapper_complaintForm_form_submitBtn_btn"
              type="submit"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ComplaintForm;
