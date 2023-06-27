import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  Item,
  Icon,
  Image,
  Comment,
  Header,
  Form,
  Button,
  Message,
  Loader,
  Dimmer
} from "semantic-ui-react";
function Book() {
  const [book, setBook] = useState();
  const [reviews, setReviews] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editedReview, setEditedReview] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [newReview, setNewReview] = useState({});
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    setNewReview({ [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios
      .get(`/api/user/book/${id}?user=${userId}`, {
        headers: {
          jwt: token,
        },
      })
      .then((res) => {
        if (res.data.data) {
          setBook(res.data.data);
        }
      })
      .catch((err) => console.dir(err));
  }, []);
  useEffect(() => {
    axios
      .get(`/api/user/reviews/${id}?user=${userId}`, {
        headers: {
          jwt: token,
        },
      })
      .then((res) => {
        if (res.data.data) {
          setReviews(res.data.data);
        }
      })
      .catch((err) => console.dir(err));
  }, [reviews]);
  const handleAddReview = () => {
    axios
      .post(`/api/user/addReview/${book._id}?user=${userId}`, newReview, {
        headers: {
          jwt: token,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.dir(err));
  };
  const handleShowEdit = (reviewId) => {
    setShowEdit(true);
    setReviewId(reviewId);
  };
  const handleChengeEditReview = (e) => {
    setEditedReview(e.target.value);
  };
  const handleEditReview = (id) => {
    axios
      .put(
        `/api/user/updateReview/${id}?user=${userId}`,
        { review: editedReview },
        {
          headers: {
            jwt: token,
          },
        }
      )
      .then((res) => {
        if (res.status) {
          setShowEdit(false);
        }
      })
      .catch((err) => console.dir(err));
  };
  const handleDeleteReview = (id) => {
    axios
      .delete(`/api/user/deleteReview/${id}?user=${userId}`, {
        headers: {
          jwt: token,
        },
      })
      .then((res) => {
        if (res.status) {
          alert(res.data.message);
        }
      })
      .catch((err) => console.dir(err));
  };
  const handleCancelEdit = () => {
    setShowEdit(false);
  };
  return (
    <div className=" min-h-[600px] w-[70%] mx-auto p-[10px] m-[60px]">
      {book ? (
        <Item className="flex min-h-[700px]">
          <Item.Image className="m-[15px] w-[500px]" src={book.bookImg} />
          <Item.Content>
            <Item.Header className="text-5xl font-Popins font-bold">
              {book.title}
            </Item.Header>{" "}
            <br />
            <Item.Description>
              <p>" {book.desc} "</p>
            </Item.Description> 
            <div className="flex justify-start items-center gap-[5px]">
              <Image
                avatar
                src={book.author.authImg}
                size="mini"
                // className="w-[20%]"
              />
              <Item.Extra className="text-xl font-bold">
                {" "}
                {book.author.fullName}{" "}
              </Item.Extra>
            </div>
            <Comment.Group>
              <Header as="h3" dividing>
                Reviews
              </Header>
              {reviews.length > 0 ? (
                reviews.map((review) => {
                  // console.log("review", review);
                  return (
                    <Comment>
                      <Comment.Avatar src={review.user.userImg}  style={{height:'40px', width:"35px"}}/>
                      <Comment.Content>
                        <Comment.Author as="a">
                          {review.user.userName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>
                            {review.createdAt.substring(0, 10)}, at{" "}
                            {review.createdAt.substring(11, 16)}{" "}
                          </div>
                        </Comment.Metadata>
                        {showEdit &&
                        review.user._id === userId &&
                        review._id === reviewId ? (
                          <Comment.Text>
                            <Form>
                              <Form.Group>
                                <Form.Input
                                  placeholder=""
                                  name="review"
                                  defaultValue={review.review}
                                  onChange={(e) => {
                                    handleChengeEditReview(e);
                                  }}
                                />
                                <Form.Button
                                  content="Edit"
                                  onClick={() => {
                                    handleEditReview(review._id);
                                  }}
                                />
                              </Form.Group>
                            </Form>
                          </Comment.Text>
                        ) : (
                          <Comment.Text>{review.review}</Comment.Text>
                        )}
                        {review.user._id === userId && !showEdit ? (
                          <Comment.Actions>
                            <Comment.Action
                              onClick={() => {
                                handleShowEdit(review._id);
                              }}
                            >
                              Edit
                            </Comment.Action>
                            <Comment.Action
                              onClick={() => {
                                handleDeleteReview(review._id);
                              }}
                            >
                              Delete
                            </Comment.Action>
                          </Comment.Actions>
                        ) : (
                          review.user._id === userId &&
                          showEdit &&
                          review._id === reviewId && (
                            <Comment.Actions>
                              <Comment.Action
                                onClick={() => {
                                  handleCancelEdit();
                                }}
                              >
                                Cancel
                              </Comment.Action>
                            </Comment.Actions>
                          )
                        )}
                      </Comment.Content>
                    </Comment>
                  );
                })
              ) : (
                <Message info>
                  <Message.Header>
                    <Icon name="exclamation circle" />
                    No reviews yet
                  </Message.Header>
                  <p>
                    <Icon name="compose" />
                    be the first one who add a review
                  </p>
                </Message>
              )}
              <Form className="mt-[2rem]">
                <Form.TextArea
                  name="review"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <Button
                  content="Add review"
                  labelPosition="left"
                  icon="edit"
                  primary
                  onClick={() => {
                    handleAddReview();
                  }}
                />
              </Form>
            </Comment.Group>
             
          </Item.Content>
        </Item>
      ) : (
        <Dimmer >
        <Loader /> loading...
      </Dimmer>
      )}
    </div>
  );
}

export default Book;

























