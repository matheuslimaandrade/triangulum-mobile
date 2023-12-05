import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, HStack, FlatList, Heading, Text } from "native-base";
import { TaskCard } from "../components/TaskCard";
import { Button } from "../components/Button";
import axios from "axios";

interface Task {
  id: number;
  descricao: string;
  concluida: boolean;
  createdAt: string;
  updatedAt: string;
  ListaTarefaId: number | null;
}

export function Home() {
  const navigation = useNavigation<any>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://api-mobile-8kh0.onrender.com/tarefas");
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        console.error("");
      }
    } catch (error) {
      console.error("Erro ao comunicar com a API:", error);
    }
  };

  function handleHistory() {
    navigation.navigate("History");
  }

  return (
    <VStack flex={1} backgroundColor="gray.600" paddingTop={30}>
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Tarefas
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {tasks.length}
          </Text>
        </HStack>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TaskCard onPress={() => console.log("ai")} task={item} />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
      <Button title="Minhas Tarefas" onPress={handleHistory} />
    </VStack>
  );
}
