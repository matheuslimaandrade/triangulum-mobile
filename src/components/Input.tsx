import { Input as InputBase , IInputProps } from 'native-base';


export function Input({...rest}: IInputProps){
  return(
    <InputBase
    bg="gray.700"
    h={14}
    px={4}
    borderWidth={0}
    color="white"
    fontSize="md"
    fontFamily="body"
    mb={4}
    placeholderTextColor="gray.300"
    _focus={{
      bg: "gray.700",
      borderWidth: 1,
      borderColor: "pink.500"
    }}
    {...rest}
    />

  );
}