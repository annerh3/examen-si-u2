import { View } from 'react-native'
import { Slot } from 'expo-router'
import { StatusBar  } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const _layout = () => {
  const safeArea = useSafeAreaInsets();
  return (
    <View  className="flex flex-1" style={{ paddingTop: safeArea.top }}>
      <Slot />
      <StatusBar style='light' />
    </View>
  )
}

export default _layout