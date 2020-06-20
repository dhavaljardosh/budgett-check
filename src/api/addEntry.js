import { gql } from "apollo-boost";

export const addEntry = ({
  type,
  amount,
}) => gql`mutation { addEntry(input: { type:"${type}", amount:${amount} } ) {
      id
      amount
      type
    }
  }
`;
