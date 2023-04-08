import Toast from 'react-native-toast-message';

export const showSuccessToast = text => {
  Toast.show({
    type: 'success',
    text1: 'Informasi',
    text2: text,
  });
};
export const showErrorToast = text => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: text,
  });
};
export const showWarningToast = text => {
  Toast.show({
    type: 'warning',
    text1: 'Perhatian',
    text2: text,
  });
};
