import { Dimensions } from 'react-native';

const WINDOW = Dimensions.get('window');

export function heightByScreen(size) {
  return (size * WINDOW.height) / 100;
}

export function widthByScreen(size) {
  return (size * WINDOW.width) / 100;
}
