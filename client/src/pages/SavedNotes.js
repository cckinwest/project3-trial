import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import NoteList from "../components/NoteList";

const SavedNotes = () => {
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    email: "",
    savedNotes: [],
  });

  const { data } = useQuery(GET_ME, {
    onCompleted: () => {
      setUserData(data.me);
    },
  });

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved notes!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedNotes.length
            ? `Viewing ${userData.savedNotes.length} saved ${
                userData.savedNotes.length === 1 ? "note" : "notes"
              }:`
            : "You have no saved notes!"}
        </h2>
        <NoteList notes={userData.savedNotes} setUserData={setUserData} />
      </Container>
    </>
  );
};

export default SavedNotes;
