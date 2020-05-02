import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import Auth from "./src/Auth";
import Main from "./src/Main";
import { ID_TOKEN_KEY } from "./config";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = (isNewUser = false) => {
    SecureStore.getItemAsync(ID_TOKEN_KEY).then(session => {
      if (session) {
        const sessionObj = JSON.parse(session);
        const { exp, token, id, name } = sessionObj;

        if (exp > Math.floor(new Date().getTime() / 1000)) {
          setToken(token);
          setUser({ id, name, isNewUser });
        } else {
          handleLogout();
        }
      }
    });
  };

  const handleLogout = () => {
    SecureStore.deleteItemAsync(ID_TOKEN_KEY);
    setToken(null);
  };

  return (
    <View style={styles.container}>
      {token && user && <Main token={token} user={user} />}
      <Auth token={token} onLogin={handleLogin} onLogout={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
