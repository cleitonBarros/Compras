import AsyncStorage from "@react-native-async-storage/async-storage"
import { FilterStatus } from "../@types/FilterStatus"

const ITEMS_STORAGE_KEY = '@compras:items'

export type ItemStorage = {
  id: string
  description: string
  status: FilterStatus
}

async function GET(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
    return storage ? JSON.parse(storage) : []
  } catch (error) {
    throw new Error("GET_ITEMS:" + error);
  }
}

async function GET_BY_STATUS(status: FilterStatus): Promise<ItemStorage[]> {
  const allItems = await GET()
  return allItems.filter(item => item.status === status)
}

async function SAVE(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {

    throw new Error("SAVE_ITEMS:" + error);
  }
}

async function ADD(item: ItemStorage): Promise<ItemStorage[]> {
  const items = await GET()
  const updatedItem = [...items, item]
  await SAVE(updatedItem)
  return updatedItem

}

async function REMOVE(id: string): Promise<void> {
  const items = await GET()
  const filteredItems = items.filter(item => item.id !== id)
  await SAVE(filteredItems)
}

async function CLEAR(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
  } catch (error) {
    throw new Error("CLEAR_ITEMS:" + error);
  }
}

async function TOGGLE_STATUS(id: string): Promise<void> {
  const item = await GET()
  const updatedItems = item.map((item) => 
    item.id === id ? {
      ...item,
      status:
        item.status === FilterStatus.PENDING
          ? FilterStatus.DONE
          : FilterStatus.PENDING
    } : item
  )

  await SAVE(updatedItems)
}

export const itemsStorage = { GET, GET_BY_STATUS, ADD, REMOVE, CLEAR, TOGGLE_STATUS }