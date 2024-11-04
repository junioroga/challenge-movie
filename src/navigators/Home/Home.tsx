import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '@/pages/Home'

export type RootStackParamListHome = {
  HomePage: undefined
}

const Stack = createNativeStackNavigator<RootStackParamListHome>()

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="HomePage" component={Home} options={{ title: 'Dashboard' }} />
    </Stack.Navigator>
  )
}
