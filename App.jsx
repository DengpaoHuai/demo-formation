import { SafeAreaView } from "react-native-safe-area-context";
import CustomStackNavigator from "./src/routers/CustomStackNavigator";
import UserContextProvider from "./src/contexts/UserContextProvider";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

const App = () => {
  const [userConnected, setUserConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  async function openDatabase() {
    console.log(Asset.fromModule(require("./assets/sqlite.db")).uri);
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );

      await FileSystem.downloadAsync(
        Asset.fromModule(require("./assets/sqlite.db")).uri,
        FileSystem.documentDirectory + "SQLite/myDatabaseName.db"
      );
    }
  }

  useEffect(() => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((res) => {
      console.log(res);
    });
    openDatabase().then(() => {
      AsyncStorage.getItem("user", (err, data) => {
        if (data) {
          setUserConnected(true);
        }
        setLoading(false);
      });
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserContextProvider>
          {loading ? (
            <></>
          ) : (
            //initialrouteName={userConnected ? "Home" : "WelcomeScreen"}
            <CustomStackNavigator
              userConnected={userConnected}
            ></CustomStackNavigator>
          )}
        </UserContextProvider>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
