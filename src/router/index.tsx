import { NavigationContainer } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { BottomTab } from '@/navigators'
import { View } from 'react-native'

export default function Router() {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top + 10 }}>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </View>
  )
}
