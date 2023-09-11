import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($noteData: NoteInput!) {
    addNote(noteData: $noteData) {
      _id
      username
      email
      savedNotes {
        _id
        title
        medicine
        startTime
        period
        numberOfTime
        total
        userId
      }
    }
  }
`;

export const REMOVE_NOTE = gql`
  mutation removeNote($noteId: ID!) {
    removeNote(noteId: $noteId) {
      _id
      username
      email
      savedNotes {
        _id
        title
        medicine
        startTime
        period
        numberOfTime
        total
        userId
      }
    }
  }
`;
