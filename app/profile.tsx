import { View, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Выйти" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
