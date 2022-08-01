import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createAccount(
      userId: String!
      userName: String!
      password: String!
      confirmPassword: String!
      email: String!
      confirmEmail: String!
    ): MutationResponse!
  }
`;
