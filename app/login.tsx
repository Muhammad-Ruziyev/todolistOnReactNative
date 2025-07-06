import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Это логин</Text>
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
