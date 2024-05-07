import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{
        headerStyle:{
            backgroundColor:"orange",
        },
        headerTintColor:"white",
        headerTitleStyle:{
            fontWeight:"bold"
        }
    }}>
        <Stack.Screen options={{headerBackTitleVisible: false, headerTitle: 'Home'}} name="index"/>
        <Stack.Screen options={{headerBackTitleVisible: false,headerTitle: 'Note'}} name="notes"/>
    </Stack>
  )
}
