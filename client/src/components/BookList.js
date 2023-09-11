import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { REMOVE_BOOK } from "../utils/mutations";
import { removeBookId } from "../utils/localStorage";

import { useMutation } from "@apollo/client";

const BookList = (props) => {
  const [removeBook, { data: updatedData }] = useMutation(REMOVE_BOOK, {
    onCompleted: () => {
      props.setUserData(updatedData.removeBook);
    },
  });

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeBook({
        variables: {
          bookId: bookId,
        },
      });

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Row>
      {props.books.map((book) => {
        return (
          <Col md="4">
            <Card key={book.bookId} border="dark">
              {book.image ? (
                <Card.Img
                  src={book.image}
                  alt={`The cover for ${book.title}`}
                  variant="top"
                />
              ) : null}
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className="small">Authors: {book.authors}</p>
                <Card.Text>{book.description}</Card.Text>
                <Button
                  className="btn-block btn-danger"
                  onClick={() => handleDeleteBook(book.bookId)}
                >
                  Delete this Book!
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default BookList;
