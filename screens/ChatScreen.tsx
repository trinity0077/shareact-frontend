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

const BACKEND_ADDRESS = 'http://BACKEND_IP:3000';

export default function PlacesScreen( {navigation}) {
  const dispatch = useDispatch();

  const [city, setCity] = useState('');

  const gotoracecard = () => {
    navigation.navigate("Racecard");
  }

const handleSubmit = () => {

  // if (city.length === 0) {
  //   return;
  // }

  // // 1st request: get geographic data from API
  // fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // Nothing is done if no city is found by API
  //     if (data.features.length === 0) {
  //       return;
  //     }

  //     const firstCity = data.features[0];
  //     const newPlace = {
  //       name: firstCity.properties.city,
  //       latitude: firstCity.geometry.coordinates[1],
  //       longitude: firstCity.geometry.coordinates[0],
  //     };

  //     // 2nd request : send new place to backend to register it in database
  //     fetch(`${BACKEND_ADDRESS}/places`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ nickname: user.nickname, name: newPlace.name, latitude: newPlace.latitude, longitude: newPlace.longitude }),
  //     }).then((response) => response.json())
  //       .then((data) => {
  //         // Dispatch in Redux store if the new place have been registered in database
  //         if (data.result) {
  //           dispatch(addPlace(newPlace));
  //           setCity('');
  //         }
  //       });
  //   });
};

  const handleDelete = (placeName) => {
    fetch(`${BACKEND_ADDRESS}/places`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: user.nickname, name: placeName }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(removePlace(placeName));
      });
  };

  // const places = user.places.map((data, i) => {
  //   return (
  //     <View key={i} style={styles.card}>
  //       <View>
  //         <Text style={styles.name}>{data.name}</Text>
  //         <Text>LAT : {Number(data.latitude).toFixed(3)} LON : {Number(data.longitude).toFixed(3)}</Text>
  //       </View>
  //       <FontAwesome name='trash-o' onPress={() => handleDelete(data.name)} size={25} color='#ec6e5b' />
  //     </View>
  //   );
  // });


  // de camille , j ai fait un emodif sur la ligne 95 pour revenir avant ma modif recolle le texte de la ligne 87
  /*<TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>*/
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chat</Text>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Message" onChangeText={(value) => setCity(value)} value={city} style={styles.input} />
       
        <TouchableOpacity onPress={gotoracecard} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Envoyer</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* {places} */}
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 20,
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    width: '65%',
    marginTop: 6,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: '30%',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#474CCC',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});
