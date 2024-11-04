import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Text } from '@/components/Text'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { selectionAsync } from 'expo-haptics'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HomeNavigator } from '../Home'
import { ListMovieNavigator } from '../Movies'

const Tab = createBottomTabNavigator()

type TabLabelProps = {
  label: string
  color: string
}

const TabLabel = ({ label, color }: TabLabelProps) => (
  <Text fow={500} style={{ color, fontSize: 10 }}>
    {label}
  </Text>
)

export const BottomTab = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenListeners={() => ({
        tabPress: () => selectionAsync(),
      })}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f1f1f1',
          paddingBottom: bottom ? bottom : 5,
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#a1a1a1',
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarTestID: 'home-tab',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={20} color={color} />,
          tabBarLabel: ({ color }) => <TabLabel label="Dashboard" color={color} />,
        }}
      />
      <Tab.Screen
        name="ListMovies"
        component={ListMovieNavigator}
        options={{
          tabBarTestID: 'search-tab',
          tabBarIcon: ({ color }) => <FontAwesome name="search" size={20} color={color} />,
          tabBarLabel: ({ color }) => <TabLabel label="Filmes" color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
