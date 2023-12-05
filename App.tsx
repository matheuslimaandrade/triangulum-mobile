import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { THEME } from './src/theme/index';
import Routes from './src/routes';
import { AuthProvider } from './src/GlobalContext/AuthProvider';
export default function App() {

  return (
    <AuthProvider>
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Routes />
      </NativeBaseProvider>
    </AuthProvider>

  );
}