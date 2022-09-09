import { selectContactPhone } from "react-native-select-contact";
import {
  openSettings,
  request,
  PERMISSIONS,
  check,
  RESULTS,
} from "react-native-permissions";

export function measureNetworkBandwitdh() {
  return new Promise((resolve, reject) => {
    check(PERMISSIONS.ANDROID.READ_CONTACTS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert(
              "Izin tidak tersedia",
              `Buka pengaturan ,pilih izin, lalu pilih kontak`,
              [
                {
                  text: "Buka pengaturan",
                  onPress: () => {
                    openSettings()
                      .then(() => console.log("setting"))
                      .catch(() => console.warn("cannot open settings"));
                  },
                },
                {
                  text: "batal",
                  onPress: () => console.log("cancel"),
                },
              ],
              { cancelable: false }
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.READ_CONTACTS, {
              title: "Baca Kontak",
              message: "Bonum meminta izin untuk membaca kontak",
              buttonPositive: "Buka",
              // buttonNegative: "Tolak",
            }).then((result) => {
              if (result == "granted") {
                selectContactPhone().then((response) => {
                  resolve(response);
                });
              } else {
                Alert.alert(
                  "Izin di tolak",
                  `Buka pengaturan ,pilih izin (permission), lalu pilih kontak`,
                  [
                    {
                      text: "Buka pengaturan",
                      onPress: () => {
                        openSettings()
                          .then(() => console.log("setting"))
                          .catch((error) => {
                            reject(new Error(error));
                          });
                      },
                    },
                    {
                      text: "batal",
                      onPress: () => console.log("cancel"),
                    },
                  ],
                  { cancelable: false }
                );
              }
            });
            break;
          case RESULTS.GRANTED:
            selectContactPhone().then((response) => {
              resolve(response);
            });
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              "Izin di tolak",
              `Buka pengaturan ,pilih izin (permission), lalu pilih kontak`,
              [
                {
                  text: "Buka pengaturan",
                  onPress: () => {
                    openSettings()
                      .then(() => console.log("setting"))
                      .catch((error) => {
                        reject(new Error(error));
                      });
                  },
                },
                {
                  text: "batal",
                  onPress: () => console.log("cancel"),
                },
              ],
              { cancelable: false }
            );
            break;
        }
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export default { measureNetworkBandwitdh };
