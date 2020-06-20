import { gql } from "apollo-boost";
export const getEntries = gql`
  {
    getEntries {
      id
      type
      amount
    }
  }
`;
