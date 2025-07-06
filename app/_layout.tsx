import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "tasks") {
            iconName = "checkmark-done-outline";
          } else if (route.name === "profile") {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7D49F2",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Задачи" }} />
      <Tabs.Screen name="profile" options={{ title: "Профиль" }} />
      <Tabs.Screen name="login" options={{ href: null }} />
    </Tabs>
  );
}
