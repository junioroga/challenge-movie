
import { View } from 'react-native';

export const Select = ({ testID, onValueChange, ...props }) => (
  <View 
    testID={testID}
    onValueChange={onValueChange}
    placeholder={{ label: 'Selecione', value: 'Selecione' }}
    {...props}
  />
); 