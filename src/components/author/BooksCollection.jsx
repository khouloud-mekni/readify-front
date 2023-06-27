import React, { useEffect, useState } from "react";
import axios from "axios";
import BookItem from "../Home/BookItem";
import { Card } from "semantic-ui-react";
function BooksCollection() {
  const [books, setBooks] = useState([]);
  let id = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  // const [newBook,setNewBook] = useState()
  useEffect(() => {
    axios
      .get(`/api/author/myBooks?user=${id}`, {
        headers: {
          jwt: token,
        },
      })
      .then((res) => setBooks(res.data.data))
      .catch((err) => console.dir(err));
  }, [books]);

  return (
    <div className="min-h-[500px] p-10">
      <Card.Group itemsPerRow={4}>
        {books.map((book) => (
          <BookItem book={book} />
        ))}
      </Card.Group>
    </div>
  );
}

export default BooksCollection;