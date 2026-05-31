import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AppNavigator from './src/navigation/AppNavigator'
import { JobProvider } from './src/store/jobStore'

export default function App() {
  return (
    <JobProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <AppNavigator />
      </SafeAreaView>
    </JobProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
})
