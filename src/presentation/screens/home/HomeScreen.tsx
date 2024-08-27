
import { StyleSheet, View } from "react-native"
import { getPokemons } from "../../../actions/pokemons"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { PokeBallBg } from "../../components/ui/PokeBallBg"
import { FlatList } from "react-native-gesture-handler"
import { Text } from "react-native-paper"
import { globalTheme } from "../../../config/theme/global-theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PokemonCard } from "../../components/pokemons/PokemonCard"




export const HomeScreen = () => {

  const { top } = useSafeAreaInsets()

  /* esta es la forma tradicional de una peticion http
    const { isLoading, data:pokemons =[]} = useQuery({
      queryKey: ['pokemons'],
      queryFn: () => getPokemons(0),
      staleTime: 1000 * 60 * 60,//60 minutes
  
    }); */


  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: (params) => getPokemons(params.pageParam),
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60,//60 minutes 

  });


  return (
    <View style={globalTheme.globalMargin} >
      <PokeBallBg style={styles.imgPosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => (
          <Text variant="displayMedium">Pokedex</Text>
        )}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        //llamar mas paginas
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}

      />


    </View>

  )
}


const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  }
})