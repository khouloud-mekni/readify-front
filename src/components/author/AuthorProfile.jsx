import React, { useEffect, useState } from "react";
import {
  Image,
  Menu,
  Button,
  Dropdown,
  Form,
} from "semantic-ui-react";

import { useNavigate } from "react-router";
import axios from "axios";
function AuthorProfile() {
  const navigate = useNavigate();
  let id = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  const [profile, setProfile] = useState();
  // const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false);
  const [ctgValue, setCtgValue] = useState("");
  const [showEditPhoto, setShowEditPhoto] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({});
  const [newBookPhoto, setNewBookPhoto] = useState({});
  // console.log(newBookPhoto);
  const handleChangeNewBook = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
      category: ctgValue,
    });
  };
  const handleBookPhoto = (e) => {
    setNewBookPhoto(e.target.files);
  };
  useEffect(() => {
    axios
      .get(`/api/author/getAuthor?user=${id}`, {
        headers: {
          jwt: token,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.status) {
          setProfile(res.data.data);
        }
      })
      .catch((err) => {
        console.dir(err);
        if (err.response.data.tokenExpired) {
          localStorage.clear();
          navigate("/login");
        }
      });
  }, [profile]);

  const handleSaveBook = () => {
    setLoading(true);
    const newBookForm = new FormData();
    newBookForm.append("photo", newBookPhoto[0]);
    newBookForm.append("title", newBook.title);
    newBookForm.append("rate", newBook.rate);
    newBookForm.append("desc", newBook.desc);
    newBookForm.append("releaseDate", newBook.releaseDate);
    newBookForm.append("category", newBook.category);
    axios
      .post(`/api/author/addBook?user=${id}`, newBookForm, {
        headers: {
          jwt: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status) {
          setLoading(false);
          navigate("/myBooks")
        }
        
        if (res.status) {
          setLoading(true);
        }
      })
      .catch((err) => console.dir(err));
  };
  return (
    <div className="min-h-[694px]">
      {profile ? (
        <div className="w-[80%] min-h-[500px] mx-auto my-[5rem] shadow-xl border-2 border-slate-300 p-[3rem] flex gap-[3rem]">
          <div>
            <Image src={profile.authImg} size="medium" bordered />
          </div>
          <div>
            <h1>{profile.fullName}</h1>
            <Menu compact>
              <Menu.Item
                as="a"
                color="black"
                onClick={() => {
                  setShowEditPhoto(!showEditPhoto);
                }}
              >
                Edit profile photo
              </Menu.Item>
              <Menu.Item link color="black">
                Edit username
              </Menu.Item>
              <Menu.Item link color="black">
                Edit password
              </Menu.Item>
              <Menu.Item link color="black">
                Edit email
              </Menu.Item>
              <Menu.Item
                link
                color="black"
                onClick={() => {
                  setShowAddBook(!showAddBook);
                }}
              >
                Add book
              </Menu.Item>
            </Menu>
            {showAddBook && (
              <>
                <Form
                  className="mt-[3rem]"
                  onChange={(e) => {
                    handleChangeNewBook(e);
                  }}
                >
                  <Form.Group unstackable widths={2}>
                    <Form.Input
                      label="Book title"
                      placeholder=""
                      name="title"
                    />
                    <Form.Input
                      label="Rate"
                      placeholder=""
                      name="rate"
                      type="number"
                      min={1}
                      max={10}
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Input
                      label="Description"
                      placeholder=""
                      name="desc"
                    />
                    <Form.Input
                      label="Release date"
                      type="date"
                      placeholder=""
                      name="releaseDate"
                    />
                  </Form.Group>
                  <Form.Group unstackable inline>
                      {/* <Menu compact>
                      <Dropdown
                        text={ctgValue ? ctgValue : "Category"}
                        // icon="filter"
                        floating
                        labeled
                        name="category"
                        // button
                        className="icon"
                      >
                         <Dropdown.Menu>
                          <Input icon="search" iconPosition="left" className="search" /> 
                         <Dropdown.Divider />
                        <Dropdown.Header icon="tags" content="Tag Label" /> 
                          <Dropdown.Menu scrolling>
                            {tagOptions.map((option) => (
                              <Dropdown.Item
                                key={option.value}
                                {...option}
                                onClick={(event, data) => {
                                  setNewBook({
                                    ...newBook,
                                    category: data.value,
                                  });
                                  setCtgValue(data.value);
                                }}
                              />
                            ))}
                          </Dropdown.Menu>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu>*/}
                  </Form.Group>
                </Form>
                <Form.Input
                  label="Book cover"
                  placeholder=""
                  name="photo"
                  type="file"
                  onChange={(e) => {
                    handleBookPhoto(e);
                  }}
                />
                <Button
                  type="submit"
                  onClick={() => {
                    handleSaveBook();
                  }}
                  loading={loading}
                >
                  Add
                </Button>
              </>
            )}
            {/* {showEditPhoto && (
              <Segment placeholder>
                <Header icon>
                  <Icon name="photo" />
                  No photos are selected.
                </Header>
                <Input
                  primary
                  type="file"
                  multiple={false}
                  name="userPhoto"
                  onChange={(e) => setPhoto(e.target.files)}
                />
                <Button
                  onClick={() => {
                    handleSavePhoto();
                  }}
                  loading={loading}
                  primary
                  size="large"
                >
                  Save
                </Button>
              </Segment>
            )} */}
          </div>
        </div>
      ) : (
        <h1>Loading ..</h1>
      )}
    </div>
  );
}

export default AuthorProfile;