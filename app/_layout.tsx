import { View } from 'react-native'
import { Slot } from 'expo-router'
import { StatusBar  } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const _layout = () => {
  // const queryClient = new QueryClient();
  const safeArea = useSafeAreaInsets();
  return (
    <View  className="flex flex-1" style={{ paddingTop: safeArea.top }}>
      <Slot />
      <StatusBar style='light' />
    </View>
  )
}

export default _layout