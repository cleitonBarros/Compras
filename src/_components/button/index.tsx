import { Text, TouchableOpacity , TouchableOpacityProps} from "react-native";
import { styles } from "./styles";


interface IButtonProps extends TouchableOpacityProps {
  title?: string
}

export  default function Button({ title, ...rest }: IButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      <Text  style={styles.text}>
        {title ? title : 'Adicionar'}
      </Text>
    </TouchableOpacity>
  )
}