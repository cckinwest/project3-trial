import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../utils/mutations";

import { saveNoteIds, getSavedNoteIds } from "../utils/localStorage";

import Auth from "../utils/auth";

const NoteForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    title: "",
    medicine: "",
    startTime: "",
    period: "",
    numberOfTime: "",
    total: "",
  });

  const [savedNoteIds, setSavedNoteIds] = useState(getSavedNoteIds());

  useEffect(() => {
    return () => saveNoteIds(savedNoteIds);
  });

  const [addNote, { error, data }] = useMutation(ADD_NOTE);
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const formattedData = {
      title: userFormData.title,
      medicine: userFormData.medicine,
      startTime: parseInt(new Date(userFormData.startTime).getTime()),
      period: parseInt(userFormData.period),
      numberOfTime: parseInt(userFormData.numberOfTime),
      total: parseInt(userFormData.total),
    };

    console.log(formattedData);

    try {
      const { data } = await addNote({
        variables: { noteData: userFormData },
      });

      console.log(data);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      title: "",
      medicine: "",
      startTime: "",
      period: "",
      numberOfTime: "",
      total: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your information!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title of note"
            name="title"
            onChange={handleInputChange}
            value={userFormData.title}
            required
          />
          <Form.Control.Feedback type="invalid">
            Title is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="medicine">Medicine</Form.Label>
          <Form.Control
            type="text"
            placeholder="The medicine taken"
            name="medicine"
            onChange={handleInputChange}
            value={userFormData.medicine}
            required
          />
          <Form.Control.Feedback type="invalid">
            Medicine is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="startTime">Start Time</Form.Label>
          <Form.Control
            type="text"
            placeholder="Start time of medicine"
            name="startTime"
            onChange={handleInputChange}
            value={userFormData.startTime}
            required
          />
          <Form.Control.Feedback type="invalid">
            Start time is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="period">Period</Form.Label>
          <Form.Control
            type="text"
            placeholder="Period"
            name="period"
            onChange={handleInputChange}
            value={userFormData.period}
            required
          />
          <Form.Control.Feedback type="invalid">
            Period is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="numberOfTime">Number of time</Form.Label>
          <Form.Control
            type="text"
            placeholder="Number of time"
            name="numberOfTime"
            onChange={handleInputChange}
            value={userFormData.numberOfTime}
            required
          />
          <Form.Control.Feedback type="invalid">
            Number of time is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="total">Total</Form.Label>
          <Form.Control
            type="text"
            placeholder="Total"
            name="total"
            onChange={handleInputChange}
            value={userFormData.total}
            required
          />
          <Form.Control.Feedback type="invalid">
            Total is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={
            !(
              userFormData.title &&
              userFormData.medicine &&
              userFormData.startTime &&
              userFormData.period &&
              userFormData.numberOfTime &&
              userFormData.total
            )
          }
          type="submit"
          variant="success"
        >
          Add note
        </Button>
      </Form>
    </>
  );
};

export default NoteForm;
