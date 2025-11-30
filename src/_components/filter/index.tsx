
import { TouchableOpacityProps, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles"
import { FilterStatus } from "../../@types/FilterStatus";
import { CircleCheck } from "lucide-react-native";
import { StatusIcon } from "../icons";

interface IFilterProps extends TouchableOpacityProps {
  status: FilterStatus
  isActive: boolean
}
export default function Filter({ status, isActive, ...rest }: IFilterProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]} 
      activeOpacity={0.8}
      {...rest}
    >
      <StatusIcon status={status} />
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? 'Comprados' : 'Pendentes'}
      </Text>
    </TouchableOpacity>
  )
}