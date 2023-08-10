import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [countryBanner, setCountryBanner] = useState("");
  // const [countryBannerPreview, setCountryBannerPreview] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const history = useHistory();

  // const validateUrl = (url) => {
  //   const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  //   return pattern.test(url);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    if (username.length < 5) {
      validationErrors.push("Username must be at least 5 characters long");
    }

    if (password.length < 5) {
      validationErrors.push("Password must be at least 5 characters long");
    }

    if (email.length < 5) {
      validationErrors.push("Email must be at least 5 characters long");
    } else if (!email.includes("@")) {
      validationErrors.push("Invalid email");
    }
    // if (countryBanner && !validateUrl(countryBanner)) {
    //   validationErrors.push("Invalid Country Banner URL");
    // }

    if (password === confirmPassword) {
      if (validationErrors.length === 0) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data);
        } else {
          closeModal();
          history.push("/main-menu");
        }
      } else {
        setErrors(validationErrors);
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
    }
  };

  // const handleCountryBannerChange = (e) => {
  //   const url = e.target.value;
  //   setCountryBanner(url);
  //   setCountryBannerPreview(url);
  //   setErrors([]);

  //   const isValidUrl = validateUrl(url);
  //   if (!isValidUrl) {
  //     setErrors(["Invalid URL."]);
  //   }
  // };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {/* <label>
          Country Banner
          <input
            type="text"
            value={countryBanner}
            onChange={handleCountryBannerChange}
            required
          />
        </label>
        {countryBannerPreview && validateUrl(countryBannerPreview) && (
          <div className="banner-preview">
            <img src={countryBannerPreview} alt="Country Banner Preview" />
          </div>
        )} */}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
