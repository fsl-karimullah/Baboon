import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

class Printer {
  async print(base64JpgLogo) {
    try {
      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printerLeftSpace(0);
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );
      await BluetoothEscposPrinter.printPic(base64JpgLogo, {
        width: 380,
        left: 0
      });
      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printText('\r\n', {});
      return true;
    } catch (e) {
      return false;
    }
  }
}

export { Printer };
export default new Printer();
