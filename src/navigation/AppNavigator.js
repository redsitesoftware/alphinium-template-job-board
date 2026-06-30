import React from 'react'
import { View } from 'react-native'
import { useJobStore } from '../store/jobStore'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import JobScreen from '../screens/JobScreen'
import PostJobScreen from '../screens/PostJobScreen'
import EmployerDashboardScreen from '../screens/EmployerDashboardScreen'

export default function AppNavigator() {
 const { state, actions } = useJobStore()

 return (
 <View style={{ flex: 1 }}>
 {state.phase === 'login' && <LoginScreen onLogin={actions.completeLogin} />}
 {state.phase === 'home' && <HomeScreen />}
 {state.phase === 'job' && <JobScreen />}
 {state.phase === 'post-job' && <PostJobScreen />}
 {state.phase === 'employer-dashboard' && <EmployerDashboardScreen />}
 </View>
 )
}
