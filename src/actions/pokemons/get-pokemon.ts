import { pokeApi } from "../../config/api/pokeApi"


export const getPokemons=async ():Promise<Pokemon[]>=>{

    try {
        const url = '/pokemon'
        const {data}=await pokeApi.get(url)

        console.log(data)

        
    } catch (error) {
        throw new Error('Error getting pokemons')
        
    }

}