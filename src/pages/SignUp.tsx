import { useNavigation } from '@react-navigation/native';
import { VStack, Text, Center, Heading, ScrollView } from 'native-base';
import React, { useState, useContext } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import axios from 'axios';
import { AuthContext } from '../GlobalContext/AuthProvider'; // Substitua pelo caminho real

export default function SignUp() {
  const navigation = useNavigation<any>();
  const { setAuthenticatedUserId } = useContext(AuthContext); // Use o contexto

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleGoBack() {
    navigation.goBack();
  }

  const handleSignUp = async () => {
    try {
      const response = await axios.post('https://api-mobile-8kh0.onrender.com/usuarios', {
        nome,
        email,
        senha,
      });

      if (response.status === 201) {
        console.log('Conta criada com sucesso!');

        const novoId = response.data.id;

        setAuthenticatedUserId(novoId);
        console.log('novoId', novoId)

        navigation.navigate('Home');
      } else {
        console.log('Resposta da API:', response.data);
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700" px={10}>
        <Center my={24}>
          <Text color="gray.100" fontWeight="bold" fontSize="lg">
            TodoApp
          </Text>
          <Text color="gray.100" fontSize="sm">
            by Matheus Lima
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>
          <Input placeholder="Nome" onChangeText={(text) => setNome(text)} />
          <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
          <Input placeholder="Senha" secureTextEntry onChangeText={(text) => setSenha(text)} />
          <Button onPress={handleSignUp} title="Criar e acessar" />
        </Center>
        <Button onPress={handleGoBack} title="Voltar para o login" variant="outline" mt={24} />
      </VStack>
    </ScrollView>
  );
}
