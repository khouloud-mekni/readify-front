import React, { useEffect, useState } from "react";
import { Card, Image, Icon, Input, Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { tagOptions } from "./tagOptions";
import BookItem from "./BookItem";
import "./style.css";
function Home() {
  const [books, setBooks] = useState([]);
  const [ctgValue, setCtgValue] = useState("");
  const [bookTitleSearch, setBookTitleSearch] = useState("");
  const [bookAuthorSearch, setBookAuthorSearch] = useState("");
  useEffect(() => {
    axios
      .get("/api/public/books")
      .then((res) => setBooks(res.data.data))
      .catch((err) => console.dir(err));
  }, [books]);
  const handleTitleFilter = (e) => {
    setBookTitleSearch(e.target.value);
  };
  const handleAuthorFilter = (e) => {
    setBookAuthorSearch(e.target.value);
  };
  return (
    <div className="min-h-[500px] p-10">
      
        <Menu.Item>
          <Input
            fluid
            label="Book title"
            className="icon w-[60%] m-10 mx-auto "
            icon="search"
            placeholder="Search..."
            onChange={(e) => {
              handleTitleFilter(e);
            }}
          />
        </Menu.Item>
     
      <div>
        <Card.Group itemsPerRow={4}>
          {books
            .filter((book) =>
              bookTitleSearch
                ? book.title
                    .toLowerCase()
                    .includes(bookTitleSearch.toLowerCase())
                : book
            )
            .filter((book) =>
              ctgValue ? book.category.includes(ctgValue) : book
            )
            .map((book, index) => (
              <BookItem key={index} book={book} />
            ))}
        </Card.Group>
      </div>
    </div>
  );
}

export default Home;





















// import React, {useEffect , useState} from 'react'
// import axios from 'axios'
// import { Card ,Image, Icon} from 'semantic-ui-react'
// import {Link} from 'react-router-dom'
// function Home() {
//   const [books , setBooks]=useState([])
//   console.log(books)
//   useEffect(() => {
//     axios('/api/public/books')
//     .then((res)=>{setBooks(res.data.data)})
//     .catch((err)=>console.log(err))
//   }, [])
  

//   return (
//     <div className="border-2 min-h-[500px] p-10">
//       <div>
//       <Card.Group itemsPerRow={4}>
//       {books.map((book)=>(
       
//       <Card color='purple' >
//       <Image  src={book.bookImg} bordered size='small' centered/>
//       {console.log(book)}
//       <Card.Content>
//       <Card.Header>{book.author.fullName}</Card.Header>
//       <Card.Meta>Joined in {book.releaseDate}</Card.Meta>
//       <Card.Description>
    
//       </Card.Description>
//     </Card.Content>
//     <Card.Content extra >
//     <div className='flex justify-between items-center'>
//       <div>
//         <Icon name='star' color='yellow' />
//         {book.rate}
//       </div>
//       <div>
//         <Icon name='comments' color='blue' />
//         <Link to={`/book/${book._id}`}> Reviews </Link>
//       </div>
//       </div>  
//     </Card.Content>
//       </Card>))}
//     </Card.Group>
//       </div>
//     </div>
//   )
// }

// export default Home









