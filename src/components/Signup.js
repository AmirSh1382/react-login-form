import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import validate from "./validate";
import styles from "./Form.module.css";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [touch, setTouch] = useState({});

  useEffect(() => {
    setError(validate(data, "Signup"));
  }, [data , touch]);

  const changeHandler = event => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = event => {
    setTouch({ ...touch, [event.target.name]: true });
  };

  const submithandler = async event => {
    event.preventDefault();

    if (Object.entries(error).length) {
      setTouch({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });

      toast.warn("Invalid data :(")
    } else {
      setLoading(true);

      let newUser = { ...data };

      try{
        await axios.post("https://login-form-3-1b33b-default-rtdb.firebaseio.com/users.json", newUser)
        toast.success("Signed up successfully :)")
        setTimeout(() => {
          setLoading(false);
          navigate("/login" , {replace : true});
        }, 4000)
      }catch (err){
        toast.error("Sth went wrong :(")
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <ToastContainer />
      <form className={styles.formContainer} onSubmit={submithandler}>
        <h3>Sign up</h3>
        
        {/* username input */}
        <div className={styles.inputHolder}>
          <label>Username</label>
          <input
            className={error.name && touch.name ? styles.uncompleted : styles.completed}
            type="text"
            name="name"
            value={data.name}
            onFocus={focusHandler}
            onChange={changeHandler}
          />
          {error.name && touch.name && <span>{error.name}</span>}
        </div>

        {/* email input */}
        <div className={styles.inputHolder}>
          <label>Email</label>
          <input
            className={error.email && touch.email ? styles.uncompleted : styles.completed}
            type="email"
            name="email"
            value={data.email}
            onFocus={focusHandler}
            onChange={changeHandler}
          />
          {error.email && touch.email && <span>{error.email}</span>}
        </div>

        {/* password input */}
        <div className={styles.inputHolder}>
          <label>Password</label>
          <input
            className={error.password && touch.password ? styles.uncompleted : styles.completed}
            type="password"
            name="password"
            value={data.password}
            onFocus={focusHandler}
            onChange={changeHandler}
          />
          {error.password && touch.password && <span>{error.password}</span>}
        </div>

        {/* confirm password input */}
        <div className={styles.inputHolder}>
          <label>Confirm Password</label>
          <input
            className={error.confirmPassword && touch.confirmPassword ? styles.uncompleted : styles.completed}
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onFocus={focusHandler}
            onChange={changeHandler}
          />
          {error.confirmPassword && touch.confirmPassword && <span>{error.confirmPassword}</span>}
        </div>

        {/* chechbox input */}
        <div className={styles.checkboxContainer}>
          <div>
            <label>I accept terms of privacy policy</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isAccepted"
              value={data.isAccepted}
              onFocus={focusHandler}
              onChange={changeHandler}
            />
          </div>
          {error.isAccepted && touch.isAccepted && <span>{error.isAccepted}</span>}
        </div>

        <div className={styles.btnContainer}>
          <Link to="/login">login</Link>
          <button className={loading ? styles.loading : ""}>Sign up</button>
        </div>
        
      </form>
    </div>
  );
};

export default Signup;