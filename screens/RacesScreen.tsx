import React from "react";
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addPlace, removePlace } from '../reducers/user';
import { useIsFocused } from '@react-navigation/native';
import Participants from '../components/Participants'


const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';

export default function PlacesScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  const [racesUp, setRacesUp] = useState([]);

  if (!isFocused) {
    return <View />;
  } else {
    fetch(`${BACKEND_ADDRESS}/users/add/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('race dans racescreen',data)
        data.result && setRaces(data.races);
      })

      
   }




  const allRacesUp = racesUp.map((race, i) => {
    return (
      <Participants
        key={race._id}
        coordinate={{ latitude: race.latitude, longitude: race.longitude }}
        title={race.address}
        onPress={() => handleMarkerPress(race)}
        pinColor="#FF4800"
      />
    );
  });


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>En cours</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFinish} activeOpacity={0.8}>
          <Text style={styles.textButton}>Terminés</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.textRace}>Course 1</Text>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* {Race} */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    width: '40%',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#E2E2F3',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: '#474CCC',
  },
  buttonFinish: {
    width: '40%',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: '#474CCC',
  },
  textButton: {
    color: 'black',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  textRace : {
    fontSize: 28,
    color: '#474CCC',
    padding: 20,
    borderBottomColor: '#474CCC',
    borderWidth: 1,
    backgroundColor: '#fff',
  }
});
