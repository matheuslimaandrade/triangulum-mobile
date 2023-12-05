import { Text, Pressable, IPressableProps } from "native-base";

type Props = IPressableProps & {
  name: string;
  isActive: boolean;
}

export function Group({ name, isActive, ...rest }: Props){
  return(
    <Pressable
    mr={3}
    w={24}
    h={10}
    bg="pink.600"
    rounded="md"
    justifyContent="center"
    alignItems="center"
    overflow="hidden"
    isPressed={isActive}
    _pressed={{
      borderColor: "pink.500",
      borderWidth: 1,
    }}
    {...rest}
    >

    <Text
    color={isActive? "gray.500" : "white"}
    textTransform="uppercase"
    fontSize="xs"
    fontWeight="bold"

    >
      {name}
    </Text>
        </Pressable>

  )
}