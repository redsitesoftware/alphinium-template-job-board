import { registerRootComponent } from 'expo'
import { Platform } from 'react-native'
import App from './App'

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    html, body {
      background: #F8FAFC;
      min-height: 100%;
      overflow-y: auto;
    }
    #root {
      min-height: 100vh;
    }
  `
  document.head.appendChild(style)
}

registerRootComponent(App)
