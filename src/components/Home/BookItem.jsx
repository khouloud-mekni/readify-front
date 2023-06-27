import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Image,
  Icon,
  Input,
  Header,
  Segment,
  Button,
  Form,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
function BookItem({ book }) {
  let id = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  let isAuthor = localStorage.getItem("isAuthor");
  const [openEdit, setOpenEdit] = useState(false);
  const handleDeleteBook = (bookId) => {
    console.log("ok");
    axios
      .delete(`/api/author/deleteBook/${bookId}?user=${id}`, {
        headers: {
          jwt: token,
        },
      })
      .then((res) => alert("Book was deleted"))
      .catch((err) => console.dir(err));
  };
  return (
    <>
      {openEdit ? (
        <Card>
          {isAuthor === "true" &&
            (book.author._id === id || book.author === id) && (
              <Card.Content>
                <Button icon onClick={() => setOpenEdit(!openEdit)}>
                  <Icon name="save" />
                </Button>
                {/* <Button icon onClick={() => handleDeleteBook(book._id)}>
                  <Icon name="trash" />
                </Button> */}
              </Card.Content>
            )}
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
              // onChange={(e) => setPhoto(e.target.files)}
            />
            {/* <Button
              onClick={() => {
                handleSavePhoto();
              }}
              loading={loading}
              primary
              size="large"
            >
              Save
            </Button> */}
          </Segment>
          <Card.Content>
            <Form>
              <Form.Input
                defaultValue={book.title}
                label="Book title"
                placeholder=""
                type="text"
                name="title"
              />
              <Form.Input
                defaultValue={book.desc}
                type="text"
                label="Description"
                placeholder=""
                name="desc"
              />
              <Form.Input
                defaultValue={book.desc}
                type="date"
                label="Release date"
                placeholder=""
                name="release"
              />
            </Form>
            <Card.Header className="text-[1.15rem]">
              {book.author.fullName}
            </Card.Header>
            {/* <Card.Meta>{book.releaseDate}</Card.Meta> */}
            {/* <Card.Description>{book.desc}</Card.Description> */}
          </Card.Content>
          <Card.Content extra>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-baseline">
                <Icon name="star" className="text-[#FFD700]"  />
                {book.rate}
              </div>
              <div className="flex justify-center items-center gap-4">
                <div>
                  <Icon name="comments" size="large" />
                 
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      ) : (
        <Card>
          {isAuthor === "true" &&
            (book.author._id === id || book.author === id) && (
              <Card.Content>
                <Button icon onClick={() => setOpenEdit(!openEdit)}>
                  <Icon name="pencil alternate" />
                </Button>
                <Button icon onClick={() => handleDeleteBook(book._id)}>
                  <Icon name="trash" />
                </Button>
              </Card.Content>
            )}
          <Image
          bordered size='small' centered
            src={book.bookImg}
            className="card-img"
           
          />
          <Card.Content>
            <Card.Header as={"h4"} className="book-title">
              {book.title}
            </Card.Header>
            <Card.Header className="text-[1.15rem] ">
              {book.author.fullName}
            </Card.Header>
            <Card.Meta> Joined in {book.releaseDate}</Card.Meta>
            {/*<Card.Description>{book.desc}</Card.Description>*/}
          </Card.Content>
          <Card.Content extra>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-baseline">
                <Icon name='star' color='yellow'/>
                {book.rate}
              </div>
              <div className="flex justify-center items-center gap-4">
                <div>
                  <Icon name='comments' color='blue'  />
                  <Link to={`/book/${book._id}`}>Reviews</Link>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}
    </>
  );
}

export default BookItem;