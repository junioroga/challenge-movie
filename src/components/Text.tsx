import { getFontSize } from '@/utils/responsiveFontSize'
import { Text as RNText, TextProps } from 'react-native'

export const Text = ({
  children,
  fow = 400,
  style,
  ...rest
}: { children: React.ReactNode; fow?: number } & TextProps) => {
  let fontSize = getFontSize(14)
  const fontWeight: Record<number, string> = {
    100: 'Poppins_100Thin',
    200: 'Poppins_200ExtraLight',
    300: 'Poppins_300Light',
    400: 'Poppins_400Regular',
    500: 'Poppins_500Medium',
    600: 'Poppins_600SemiBold',
    700: 'Poppins_700Bold',
    800: 'Poppins_800ExtraBold',
    900: 'Poppins_900Black',
  }

  if (style) {
    if (style instanceof Array) {
      style.forEach((s) => {
        if (s && typeof s === 'object' && 'fontSize' in s && s.fontSize !== undefined) {
          fontSize = getFontSize(s.fontSize)
        }
      })
    } else if (typeof style === 'object' && 'fontSize' in style && style.fontSize !== undefined) {
      fontSize = getFontSize(style.fontSize)
    }
  }

  return (
    <RNText style={[{ fontFamily: fontWeight[fow], fontSize }, style]} {...rest}>
      {children}
    </RNText>
  )
}
