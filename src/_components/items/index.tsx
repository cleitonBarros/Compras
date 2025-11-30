import { Text, TouchableOpacity, View } from "react-native";
import { FilterStatus } from "../../@types/FilterStatus";
import { styles } from "./styles";
import { StatusIcon } from "../icons";
import { Trash2 } from "lucide-react-native";

type ItemData = {
  status: FilterStatus
  description: string
}

type ItemProps = {
  data: ItemData
  onRemove?: () => void
  onStatus?: () => void
}

export default function Item({ data , onRemove, onStatus }: ItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>
      <Text style={styles.description}>
        {data.description}
      </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Trash2 size={18} color="#dd0a0a" />
      </TouchableOpacity>
    </View>
  )
}