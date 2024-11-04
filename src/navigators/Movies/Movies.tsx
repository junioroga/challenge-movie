import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Movies } from '@/pages/Movies'

export type RootStackParamListSearch = {
  MoviesPage: undefined
}

const Stack = createNativeStackNavigator<RootStackParamListSearch>()

export const ListMovieNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MoviesPage"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="MoviesPage" component={Movies} options={{ title: 'Filmes' }} />
    </Stack.Navigator>
  )
}
