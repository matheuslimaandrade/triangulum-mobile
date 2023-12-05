import { Button as ButtonBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
}

export function Button({ title, variant, ...rest}: Props){
  return(
    <ButtonBase
    w="full"
    h={14}
    bg={ variant === "outline" ? "transparent" : "pink.700" }
    borderWidth={ variant === "outline" ? 1 : 0 }
    borderColor="pink.500"
    
    rounded="sm"
    _pressed={{
      bg:  variant === "outline" ? "gray.500" : "pink.500"
    }}
    {...rest}>
      <Text color={ variant === "outline" ? "pink.500" : "white" }
      fontFamily="heading"
      fontSize="sm" >
        {title}
      </Text>
    </ButtonBase>  );
}