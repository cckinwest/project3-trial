import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
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
        timeArray
        userId
      }
    }
  }
`;
