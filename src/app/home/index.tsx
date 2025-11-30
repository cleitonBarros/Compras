
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native"

import { styles } from "./styles"
import Button from "../../_components/button"
import Input from "../../_components/input"
import Filter from "../../_components/filter"

import { FilterStatus } from "../../@types/FilterStatus"
import { BrushCleaning } from "lucide-react-native";
import Item from "../../_components/items"
import { useEffect, useState } from "react"
import { ItemStorage, itemsStorage } from "../../storage/itemsStorage"


const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.PENDING,
  FilterStatus.DONE
]



export function Home() {
  const [items, setItems] = useState<ItemStorage[]>([])
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [value, setValue] = useState('')

  console.log(items)


  async function handleAdd() {
    if (!value.trim()) {
      return Alert.alert("Aviso", "Por favor, insira uma descrição válida para o item.")
    }

    const newItem = {
      id: String(new Date().getTime()),
      description: value,
      status: FilterStatus.PENDING
    }
    await itemsStorage.ADD(newItem)
    await itembyStatus()

    Alert.alert("Sucesso", `Adicionado ${newItem.description} ao carrinho.`)
    setFilter(FilterStatus.PENDING)
    setValue('')
  }

  async function itembyStatus() {
    await itemsStorage.GET_BY_STATUS(filter).then((res) => { setItems(res) }).catch((err) => {
      Alert.alert("Erro", "Não foi possível adicionar o item.")
    })
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.REMOVE(id)
      await itembyStatus()
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o item.")
    }
  }

  function handleClear() {
    Alert.alert("Limpar itens", "Tem certeza que deseja limpar todos os itens?", [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Limpar",
        style: "destructive",
        onPress: () => onClear()
      }
    ])
  }

  async function onClear() {
    try {
      await itemsStorage.CLEAR()
      setItems([])
    } catch (error) {
      console.log(error)
      Alert.alert("Limpar", "Não foi possível remover todos os itens.")
    }
  }

  async function handleToggleStatus(id: string) {
    try {
      await itemsStorage.TOGGLE_STATUS(id)
      await itembyStatus()
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status do item.")
    }
  }
  useEffect(() => {
    itembyStatus()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <View style={styles.form}>
        <Input
          placeholder="Adicionar item ao carrinho"
          onChangeText={setValue}
          value={value}
        />
        <Button onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter
                key={status}
                status={status}
                isActive={status === filter}
                onPress={() => setFilter(status)}
              />
            ))
          }
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
            <BrushCleaning size={18} color={"#828282"} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemove(item.id)}
              onStatus={() => handleToggleStatus(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />

      </View>
    </View>
  )
}