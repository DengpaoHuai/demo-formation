import { StatusBar } from "expo-status-bar";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useFetch from "./src/hooks/useFetch1";

type Planet = {
  name: string;
  population: string;
  climate: string;
  rotation_period: string;
  url: string;
};

type Planets = Array<Planet>;

type PlanetsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planets;
};

type GetData = (url: string) => Promise<void>;

const App: FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending } = useFetch(
    `https://swapi.dev/api/planets/?page=${page}`,
    page
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {isPending ? (
            <ActivityIndicator size="large" color="#e2e2e2"></ActivityIndicator>
          ) : (
            <View style={styles.planetCardsContainer}>
              {data?.results.map((planet) => {
                return (
                  <View style={styles.planetCard} key={planet.url}>
                    <Text>name : {planet.name}</Text>
                    <Text>population : {planet.population}</Text>
                  </View>
                );
              })}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={!data?.previous}
              style={
                data?.previous && !isPending
                  ? styles.customButton
                  : styles.disabledCustomButton
              }
              onPress={() => {
                if (data?.previous) setPage(page - 1);
              }}
            >
              <Text>Précédent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!data?.next}
              style={
                data?.next && !isPending
                  ? styles.customButton
                  : styles.disabledCustomButton
              }
              onPress={() => {
                if (data?.next) setPage(page + 1);
              }}
            >
              <Text>Suivant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 50,
  },
  planetCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    width: "40%",
  },
  planetCardsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  customButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    width: "40%",
  },
  disabledCustomButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    width: "40%",
    opacity: 0.5,
  },
});

export default App;
