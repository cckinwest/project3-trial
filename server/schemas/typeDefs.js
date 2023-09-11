const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    noteCount: Int
    savedNotes: [Note]
  }

  type Note {
    _id: ID!
    title: String!
    medicine: String!
    startTime: Int!
    period: Int!
    numberOfTime: Int!
    total: Int!
    timeArray: [Int]
    userId: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input NoteInput {
    title: String!
    medicine: String!
    startTime: Int!
    period: Int!
    numberOfTime: Int!
    total: Int!
  }

  type Query {
    me: User
    notes: [Note]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addNote(noteData: NoteInput!): User
    removeNote(noteId: ID!): User
  }
`;

module.exports = typeDefs;
