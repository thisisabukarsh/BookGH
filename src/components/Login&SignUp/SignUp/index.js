import { useState, useEffect, useRef, useN } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignUp.css";
import Footer from "../../Footer";

const USER_REGEX = /^[a-zA-Z\u0600-\u06FF][a-zA-Z0-9\u0600-\u06FF-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGISTER_URL = "/register"; // check it from the back end

const SignUp = () => {
  //use ref to get focus on user and error
  const userRef = useRef();
  const errRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  //use state for user state
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //use state for email state
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //use state for PWd state
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //use state for Match Pwd state
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //use state for success or error state
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //use state for check visibility of the className
  const [isVisible, setIsVisible] = useState(false);

  //use effect for check the visibility of the className and set focus on the user felid when component load
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/signup") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  //use effect for check validation on the user when change
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  // use effect for check if the email matches the pattern
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  //use effect for check validation on the pwd and matchPwd when change
  useEffect(() => {
    //here for the pwd
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    //here for the pwdMatch
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  //use effect for error message to clear it when user read it that's happen when change one of the states
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if button enabled
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Please enter a valid username and password");
      return;
    }
    try {
      // const response = await axios.post(
      //   REGISTER_URL,
      //   JSON.stringify({ email, pwd }), //change it as on the back end
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   }
      // );
      setSuccess(true);
      // clear the inputs felids
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
    } catch (err) {
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 409) {
      //   setErrMsg("User already exists");
      // } else {
      //   setErrMsg("Registration Failed");
      // }
      // errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        navigate("/profile")
      ) : (
        <div className={`landing ${isVisible ? "background-s" : ""}`}>
          <section className={`container-s ${isVisible ? "show" : ""}`}>
            <h2>Sign Up</h2>
            <p
              ref={errRef}
              className={errMsg ? "errMsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">
                  Name:{"  "}
                  <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="form-control"
                  placeholder="Enter name"
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>{" "}
                  4 to 24 characters. <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email Address:{"  "}
                  <span className={validEmail ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="form-control"
                  placeholder="Enter email"
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>{" "}
                  Please enter a valid email address in the format
                  'example@example.com'
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password:{"  "}
                  <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="form-control"
                  placeholder="Enter password"
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>{" "}
                  8 to 24 characters. <br />
                  Must include uppercase and lowercase letter, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percent">%</span>
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="confirm_pwd">
                  Confirm Password:{"  "}
                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch && matchPwd ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="form-control"
                  placeholder="Confirm password"
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>{" "}
                  Must match the password input field.
                </p>
              </div>
              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
                className="btn-primary"
              >
                SignUp
              </button>
              <p>
                Already have an account?
                <Link to="/login" className="link">
                  Login
                </Link>
              </p>
            </form>
          </section>
          <div className="footer">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;