import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";

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

const PlanetList: FC = () => {
  const [planetsResponse, setPlanetsResponse] = useState<PlanetsResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

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
        <CustomButton
          disabled={!planetsResponse.previous}
          onPress={() => {
            if (planetsResponse.previous) getData(planetsResponse.previous);
          }}
        >
          Précédent
        </CustomButton>
        <CustomButton
          disabled={!planetsResponse.next}
          onPress={() => {
            if (planetsResponse.next) getData(planetsResponse.next);
          }}
        >
          Suivant
        </CustomButton>
      </View>
    </View>
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
});

export default PlanetList;
