import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Index() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace("/login"); // ⬅️ если нет токена — перекидываем
    }
  }, [token, isLoading]);

  if (isLoading) {
    return <Text>Загрузка...</Text>;
  }

  if (!token) {
    return null; // ничего не рендерим, т.к. редирект в login
  }

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@tasks");
        if (jsonValue != null) {
          setTasks(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("ошибка загрузки задач", e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem("@tasks", jsonValue);
      } catch (e) {
        console.log("ошибка при  сохронение задач :", e);
      }
    };
    saveTasks();
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: task.trim(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTask("");
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Введите задачу"
          placeholderTextColor="#999"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.todoButton} onPress={handleAddTask}>
          <Text style={styles.addButton}>добавить</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => handleToggleComplete(item.id)}>
              <Ionicons
                name={
                  item.completed
                    ? "checkmark-circle"
                    : "checkmark-circle-outline"
                }
                size={24}
                color={item.completed ? "green" : "gray"}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.taskText,
                item.completed && styles.taskTextCompleted,
              ]}
            >
              {item.title}
            </Text>

            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        style={{ marginTop: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
    paddingTop: 80,
    backgroundColor: "#F4F4F4",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  todoButton: {
    backgroundColor: "#7D49F2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginLeft: 10,
    borderRadius: 8,
  },
  addButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    padding: 10,
    width: 200,
    color: "#0D0D0D",
    backgroundColor: "#fff",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#7D49F2",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    gap: 20,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
