import gql from "graphql-tag";

export const GET_TODOS = gql`
  {
    todos(order_by: { created_at: desc }) {
      id
      text
      is_completed
    }
  }
`;
