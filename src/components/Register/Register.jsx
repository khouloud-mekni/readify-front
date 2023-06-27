import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Checkbox,
  Icon,
} from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState("user");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  // const [existedEmailError, setExistedEmailError] = useState("");
  const [author, setAuthor] = useState({});
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlAuthorChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };
  const handleUserRegister = () => {
    axios
      .post("/api/user/register", user)
      .then((res) => {
        if (res) {
          swal(
            "Good job!",
            `${res.data.message}, please check your email`,
            "success",
            {
              button: "Continue",
            }
          ).then((value) => {
            navigate("/login");
            localStorage.setItem("userEmail", user.email);
          });
        }
      })
      .catch((err) => {
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else if (err.response.data.existedEmailError) {
          // setExistedEmailError(err.response.data.existedEmailError);
          toast.error(err.response.data.existedEmailError, {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };
  const handleAuthorRegister = () => {
    axios
      .post("/api/author/register", author)
      .then((res) => {
        if (res) {
          console.log(res);
          swal(
            "Good job!",
            res.data.message,
            "success",
            {
              button: "Continue",
            }
          ).then((value) => {
            navigate("/login");
            localStorage.setItem("authorEmail", author.email);
          });
        }
      })
      .catch((err) => {
        console.dir(err);
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else if (err.response.data.existedEmailError) {
          // setExistedEmailError(err.response.data.existedEmailError);
          toast.error(err.response.data.existedEmailError, {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };
  return (
    <div className="w-[60%] mx-auto my-20">
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            {/* USER REGISTER */}
            {value === "user" ? (
              <>
                <Form.Field>
                  <Checkbox
                    radio
                    label="I am a user"
                    name="checkboxRadioGroup"
                    value="user"
                    checked={value === "user"}
                    onChange={(e, data) => setValue(data.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label="I am an author"
                    name="checkboxRadioGroup"
                    value="author"
                    checked={value === "author"}
                    onChange={(e, data) => setValue(data.value)}
                  />
                </Form.Field>
                <Form
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <Form.Input
                    error={
                      error.toLowerCase().includes("username")
                        ? {
                            content: error,
                            pointing: "below",
                          }
                        : null
                    }
                    icon="user"
                    iconPosition="left"
                    label="Username"
                    placeholder="Username"
                    name="userName"
                  />
                  <Form.Input
                    error={
                      error.toLowerCase().includes("email")
                        ? {
                            content: error,
                            pointing: "below",
                          }
                        : null
                    }
                    icon="mail"
                    iconPosition="left"
                    label="Email"
                    placeholder="Email"
                    type="email"
                    name="email"
                  />
                  <Form.Input
                    error={
                      error.toLowerCase().includes("password")
                        ? {
                            content: error,
                            pointing: "below",
                          }
                        : null
                    }
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <Form.Input
                    error={
                      error.toLowerCase().includes("confirm")
                        ? {
                            content: error,
                            pointing: "below",
                          }
                        : null
                    }
                    icon="lock"
                    iconPosition="left"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm_password"
                  />

                  <Button
                    onClick={() => {
                      handleUserRegister();
                    }}
                    content="Register"
                    primary
                  />
                </Form>
              </>
            ) : (
              <>
                {/* Author REGISTER */}
                <Form.Field>
                  <Checkbox
                    radio
                    label="I am a user"
                    name="checkboxRadioGroup"
                    value="user"
                    checked={value === "user"}
                    onChange={(e, data) => setValue(data.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label="I am an author"
                    name="checkboxRadioGroup"
                    value="author"
                    checked={value === "author"}
                    onChange={(e, data) => setValue(data.value)}
                  />
                </Form.Field>
                <Form
                  onChange={(e) => {
                    handlAuthorChange(e);
                  }}
                >
                  <Form.Input
                    icon="user"
                    iconPosition="left"
                    label="Full Name"
                    placeholder="Fullame"
                    name="fullName"
                    error={
                      error.toLowerCase().includes("fullname")
                        ? {
                            content: error,
                            pointing: "below",
                          }
                        : null
                    }
                  />
                  <Form.Input
                    icon="mail"
                    iconPosition="left"
                    label="Email"
                    placeholder="Email"
                    name="email"
                    error={
                      error.includes("email")
                        ? {
                            content: error,
                            pointing: "below",
                          }
                        : null
                    }
                  />
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    type="password"
                    name="password"
                    error={
                      error.toLowerCase().includes("password")
                        ? {
                            content: error,
                            pointing: "below",
                          }
                        : null
                    }
                  />
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    label="Confirm Password"
                    type="password"
                    name="confirm_password"
                    error={
                      error.toLowerCase().includes("confirm")
                        ? {
                            content: error,
                            pointing: "below",
                          }
                        : null
                    }
                  />
                  <Form.Input
                    icon="user"
                    iconPosition="left"
                    label="A short Biography"
                    placeholder="Resume"
                    name="bio"
                    error={
                      error.toLowerCase().includes("bio")
                        ? {
                            content: error,
                            pointing: "below",
                          }
                        : null
                    }
                  />
                  <Button
                    content="Register"
                    primary
                    onClick={() => {
                      handleAuthorRegister();
                    }}
                  />
                </Form>
              </>
            )}
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button icon labelPosition="right" size="big">
              <Link to="/login" style={{ all: "unset" }}>
                Login
              </Link>
              <Icon name="signup" />
            </Button>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Register;