import React from 'react'
import { View } from 'react-native'
import { useJobStore } from '../store/jobStore'
import HomeScreen from '../screens/HomeScreen'
import JobScreen from '../screens/JobScreen'
import PostJobScreen from '../screens/PostJobScreen'

export default function AppNavigator() {
 const { state } = useJobStore()

 return (
 <View style={{ flex: 1 }}>
 {state.phase === 'home' && <HomeScreen />}
 {state.phase === 'job' && <JobScreen />}
 {state.phase === 'post-job' && <PostJobScreen />}
 </View>
 )
}
