import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { GRAPHQL_ENDPOINT } from "../config";
import { INSERT_USER } from "../data/mutations";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

const Main = ({ token, user }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const { id, name, isNewUser } = user;

    const client = new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (isNewUser) {
      client.mutate({
        mutation: INSERT_USER,
        variables: { id, name }
      });
    }

    setClient(client);
  }, []);

  if (!client) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ApolloProvider client={client}>
      <View>
        <AddTodo />
        <TodoList />
      </View>
    </ApolloProvider>
  );
};

Main.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default Main;
