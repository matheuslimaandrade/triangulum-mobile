import React, { useState } from 'react';
import { ScrollView, VStack, Text, Center, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import axios from 'axios';

export default function SignIn() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleNewAccount = () => {
    navigation.navigate('SignUp');
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.get('https://api-mobile-8kh0.onrender.com/usuarios', {
        params: {
          email,
          senha,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        console.log('Login bem-sucedido!');
        navigation.navigate('Home')
      } else {
        console.log('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.700" px={10}>
        <Center my={24}>
          <Text color="gray.100" fontWeight='bold' fontSize="lg">
            Triangulum App
          </Text>
          <Text color="gray.100" fontSize="sm">
            by Matheus Lima
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>
          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder='Senha'
            secureTextEntry
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
          <Button
            title='Acessar'
            onPress={handleSignIn}
          />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button
            title='Criar conta'
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
