import { gql } from "apollo-boost";

export const deleteEntry = ({ id }) => gql`
  mutation {
    deleteEntry(id: "${id}") {
      id
      amount
      type
    }
  }
`;
