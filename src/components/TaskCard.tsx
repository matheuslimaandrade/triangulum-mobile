import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {  HStack, VStack, Heading, Text, Icon } from 'native-base';
import { Entypo } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
  task: {
    id: number;
    descricao: string;
    concluida: boolean;
  };
};

export function TaskCard({ task, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg={task.concluida ? 'green.500' : 'gray.500'} alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <VStack flex={1}>
          <Heading fontSize="lg" color="white" numberOfLines={2}>
            {task.descricao}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1}>
            {task.concluida ? 'Concluída' : 'Pendente'}
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
