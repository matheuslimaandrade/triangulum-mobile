import React, { useState, useEffect } from 'react';
import { ScrollView, VStack, Heading, Text, SectionList, HStack, Modal } from 'native-base';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import axios from 'axios';

interface Task {
  id: number;
  descricao: string;
}

interface Section {
  title: string;
  data: Task[];
}

export function History() {
  const [tasks, setTasks] = useState<Section[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState('');


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://api-mobile-8kh0.onrender.com/tarefas');
      if (response.status === 200) {
        const tasksWithId = response.data.map((task: Task) => ({
          ...task,
          id: task.id,
        }));

        setTasks([
          {
            title: 'Tarefas',
            data: tasksWithId,
          },
        ]);
      } else {
        console.error('Falha ao obter as tarefas.');
      }
    } catch (error) {
      console.error('Erro ao comunicar com a API:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post('https://api-mobile-8kh0.onrender.com/tarefas', {
        descricao: newTaskDescription,
        concluida: newTaskCompleted,
      });

      if (response.status === 200) {
        fetchTasks();
        setNewTaskDescription('');
        setNewTaskCompleted(false);
      } else {
        console.error('Falha ao adicionar a nova tarefa.');
      }
    } catch (error) {
      console.error('Erro ao comunicar com a API:', error);
    }
  };

  const handleUpdateTask = async (taskId: number) => {
    try {
      const taskToUpdate = tasks.flatMap((section) => section.data).find((task) => task.id === taskId);

      if (!taskToUpdate) {
        console.error('Tarefa não encontrada para atualização.');
        return;
      }

      setIsEditingTask(true);
      setEditingTaskId(taskId);
      setEditingTaskDescription(taskToUpdate.descricao);
    } catch (error) {
      console.error('Erro ao preparar a atualização da tarefa:', error);
    }
  };

  const handleSaveUpdatedTask = async () => {
    try {
      const response = await axios.put(`https://api-mobile-8kh0.onrender.com/tarefas/${editingTaskId}`, {
        descricao: editingTaskDescription,
        concluida: false,  
      });

      if (response.status === 200) {
        fetchTasks();
        setIsEditingTask(false);
        setEditingTaskId(null);
        setEditingTaskDescription('');
      } else {
        console.error('Falha ao atualizar a tarefa.');
      }
    } catch (error) {
      console.error('Erro ao comunicar com a API:', error);
    }
  };



  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await axios.delete(`https://api-mobile-8kh0.onrender.com/tarefas/${taskId}`);
      if (response.status === 200) {
        fetchTasks();
      } else {
      }
    } catch (error) {
      console.error('Erro ao comunicar com a API:', error);
    }
  };

  return (
    <ScrollView flex={1} backgroundColor="gray.500" paddingTop={20}>
      <Heading color="gray.100" fontSize="xl" textAlign="center">
        Adicionar uma nova tarefa
      </Heading>
      <VStack padding={8}>
        <Input
          placeholder="Descrição da Nova Tarefa"
          value={newTaskDescription}
          onChangeText={(text) => setNewTaskDescription(text)}
        />
        <Button title="Adicionar" onPress={handleAddTask} />
      </VStack>

      <SectionList
        sections={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: Task }) => (
          <VStack marginBottom={20} key={item.id} flexDirection="row" justifyContent="space-between" px={8}>
            <Text color='white' fontSize={28}>{item.descricao}</Text>
            <VStack>
              <Button  title='atualizar' onPress={() => handleUpdateTask(item.id)} />
              <Button title='deletar' onPress={() => handleDeleteTask(item.id)} />
            </VStack>
          </VStack>

        )}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={tasks.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há tarefas ainda. {'\n'}
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
            <Modal isOpen={isEditingTask} onClose={() => setIsEditingTask(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Editar Tarefa</Modal.Header>
          <Modal.Body>
            <Input
              placeholder="Nova Descrição da Tarefa"
              value={editingTaskDescription}
              onChangeText={(text) => setEditingTaskDescription(text)}
            />
            <Button title="Salvar" onPress={handleSaveUpdatedTask} />
          </Modal.Body>
        </Modal.Content>
      </Modal>

    </ScrollView>
  );
}
