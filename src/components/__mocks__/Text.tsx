import { Text as RNText } from 'react-native'

export const Text = ({ children, fow, ...props }) => (
  <RNText {...props} fow={fow}>
    {children}
  </RNText>
)
