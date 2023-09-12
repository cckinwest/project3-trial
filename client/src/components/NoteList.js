import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { REMOVE_NOTE } from "../utils/mutations";
import { removeNoteId } from "../utils/localStorage";

import { useMutation } from "@apollo/client";

const NoteList = (props) => {
  const [removeNote, { data: updatedData }] = useMutation(REMOVE_NOTE, {
    onCompleted: () => {
      props.setUserData(updatedData.removeNote);
    },
  });

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteNote = async (noteId) => {
    try {
      console.log(noteId);

      const { data } = await removeNote({
        variables: {
          noteId: noteId,
        },
      });

      removeNoteId(noteId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Row>
      {props.notes.map((note) => {
        return (
          <Col md="4">
            <Card key={note._id} border="dark">
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>

                <Card.Text>{note.medicine}</Card.Text>
                <Card.Text>{note.startTime}</Card.Text>
                <Card.Text>{note.period}</Card.Text>
                <Card.Text>{note.numberOfTime}</Card.Text>
                <Card.Text>{note.total}</Card.Text>
                <Button
                  className="btn-block btn-danger"
                  onClick={() => handleDeleteNote(note._id)}
                >
                  Delete this Note!
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default NoteList;
