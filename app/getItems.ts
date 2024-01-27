import axios from "axios"
import { TypeBoard, TypeCard } from "./type"

const URL = "https://65b499eb41db5efd2866a9d7.mockapi.io/items"

export async function getTodos(){
    const { data } = await axios.get<TypeCard[]>(`${URL}`)

    const obj: TypeBoard[] = [
        {
            id: '1',
            title: 'Сделать', 
            items: [...data]
        },
        {
            id: '2',
            title: 'Проверить', 
            items: []
        },
        {
            id: '3',
            title: 'Сделано', 
            items: []
        },
    ]

    return obj
}