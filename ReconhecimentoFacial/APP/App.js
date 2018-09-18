import { StackNavigator } from 'react-navigation';
import Home from './src/components/Home';
import Camera from './src/components/Camera';
import GaleriaFotos from './src/components/GaleriaFotos';

export default App = StackNavigator({
  Home: { screen: Home },
  Camera: { screen: Camera },
  GaleriaFotos: { screen: GaleriaFotos },
});
