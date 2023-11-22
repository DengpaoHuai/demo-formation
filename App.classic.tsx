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
  const [count, setCount] = useState<number>(0);
  const [planetsResponse, setPlanetsResponse] = useState<PlanetsResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handlePress = () => {
    setCount(count + 1);
  };

  const getData: GetData = async (url) => {
    setLoading(true);
    const reponse = await fetch(url);
    const planets = await reponse.json();
    setLoading(false);
    setPlanetsResponse(planets);
  };

  useEffect(() => {
    getData("https://swapi.dev/api/planets");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#e2e2e2"></ActivityIndicator>
          ) : (
            <View style={styles.planetCardsContainer}>
              {planetsResponse.results.map((planet) => {
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
              disabled={!planetsResponse.previous}
              style={
                planetsResponse.previous && !loading
                  ? styles.customButton
                  : styles.disabledCustomButton
              }
              onPress={() => {
                if (planetsResponse.previous) getData(planetsResponse.previous);
              }}
            >
              <Text>Précédent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!planetsResponse.next}
              style={
                planetsResponse.next && !loading
                  ? styles.customButton
                  : styles.disabledCustomButton
              }
              onPress={() => {
                if (planetsResponse.next) getData(planetsResponse.next);
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
    shadowOpacity: 0.5,
    shadowRadius: 10,
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
