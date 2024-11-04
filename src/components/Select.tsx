import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select'

export const Select = (props: PickerSelectProps) => {
  return (
    <RNPickerSelect
      style={{
        placeholder: { color: '#a1a1a1', fontFamily: 'Poppins_500Medium', fontSize: 14 },
        inputAndroid: { fontFamily: 'Poppins_500Medium', fontSize: 14, height: 30 },
        inputIOS: { fontFamily: 'Poppins_500Medium', fontSize: 14, height: 30 },
        inputAndroidContainer: {
          backgroundColor: '#f1f1f1',
          padding: 4,
          borderRadius: 3,
        },
        inputIOSContainer: { backgroundColor: '#f1f1f1', padding: 4, borderRadius: 3 },
      }}
      placeholder={{ label: 'Selecione', value: 'Selecione' }}
      useNativeAndroidPickerStyle={false}
      {...props}
    />
  )
}
