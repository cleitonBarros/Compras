import {  TextInputProps, TextInput } from "react-native";
import { styles } from "./styles";


interface IInputProps extends TextInputProps {
  title?: string
}

export default function Input({ ...rest }: IInputProps) {
  return (
    <TextInput style={styles.container} placeholderTextColor="#74798b" {...rest} />
  )
}