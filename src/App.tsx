import { useCallback } from 'react'

import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from '@expo-google-fonts/poppins'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'

import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import Router from './router'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded) {
    return <></>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar animated style="dark" />
      <SafeAreaProvider initialMetrics={initialWindowMetrics} onLayout={onLayoutRootView}>
        <Router />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
