import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Icon,
  Checkbox,
  Message,
} from "semantic-ui-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  let check = localStorage.getItem("checkBox");
  if (!check) {
    check = "user";
  }
  const navigate = useNavigate();
  const [value, setValue] = useState(check);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({});
  const [author, setAuthor] = useState();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleAuthorChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };
  const handleUserLogin = () => {
    axios
      .post("/api/user/login", user)
      .then((res) => {
        console.log("login res", res);
        if (res.data.data.isBanned) {
          alert("you are banned");
        } else if (res.data.status) {
          localStorage.setItem("id", res.data.data.id);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("isBanned", res.data.data.isBanned);
          localStorage.setItem("isVerified", res.data.data.isVerified);
          localStorage.setItem("isUser", res.data.data.isUser);
          localStorage.setItem("isAdmin", res.data.data.isAdmin);
          navigate("/user-profile");
        }
      })
      .catch((err) => {
        if (err) {
          setErrorMsg(err.response.data.error);
        }
      });
  };
  const handleAuthorLogin = () => {
    axios
      .post("/api/author/login", author)
      .then((res) => {
        if (res.data.status) {
          localStorage.clear();
          localStorage.setItem("id", res.data.data.id);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("isBanned", res.data.data.isBanned);
          localStorage.setItem("isVerified", res.data.data.isVerified);
          localStorage.setItem("isAuthor", res.data.data.isAuthor);
          localStorage.setItem("isAdmin", res.data.data.isAdmin);
          navigate("/author-profile");
        }
      })
      .catch((err) => {
        console.dir(err);
        if (err) {
          setErrorMsg(err.response.data.error);
        }
      });
  };
  const hideMsg = () => {
    setTimeout(() => {
      setErrorMsg("");
    }, 10000);
  };
  return (
    <div className="w-[60%] mx-auto">
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
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
            {value === "user" ? (
              <>
                <Message header="Login as user" />
                <Form
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <Form.Input
                    icon="mail"
                    iconPosition="left"
                    label="Email"
                    placeholder="Email"
                    name="email"
                  />
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    type="password"
                    name="password"
                  />
                  <Button
                    content="Login"
                    primary
                    onClick={() => handleUserLogin()}
                  />
                </Form>
                {errorMsg && (
                  <Message negative>
                    <Message.Header>{errorMsg}</Message.Header>
                    {hideMsg()}
                  </Message>
                )}
              </>
            ) : (
              <>
                <Message header="Login as an author" />
                <Form
                  onChange={(e) => {
                    handleAuthorChange(e);
                  }}
                >
                  <Form.Input
                    icon="mail"
                    type="email"
                    iconPosition="left"
                    label="Email"
                    placeholder="Username"
                    name="email"
                  />
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    type="password"
                    name="password"
                  />
                  <Button
                    content="Login"
                    primary
                    onClick={() => {
                      handleAuthorLogin();
                    }}
                  />
                </Form>
                {errorMsg && (
                  <Message negative>
                    <Message.Header>{errorMsg}</Message.Header>
                    {hideMsg()}
                  </Message>
                )}
              </>
            )}
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Button icon size="big" labelPosition="right">
              <Link to="/register" style={{ all: "unset" }}>
                Register
              </Link>
              <Icon name="signup" />
            </Button>
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  );
}

export default Login;