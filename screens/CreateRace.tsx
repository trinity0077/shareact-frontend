import React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';



const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';
//const BACKEND_ADDRESS = 'http://10.6.240.95:3000';

export default function CreateRace() {
  const user = useSelector((state) => state.user.value);
  const route = useRoute();
  const { coord } = route.params;

  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [selectedValue, setSelectedValue] = useState("");
  const [nbrParticipants, setNbrParticipants] = useState('');


  // Description
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  // Durée
  const handleDurationChange = (text) => {
    setDuration(text.replace(/[^0-9]/g, '').slice(0, 3));
  };

  // Distance
  const handleDistanceChange = (text) => {
    setDistance(text.replace(/[^0-9]/g, '').slice(0, 3));
  };

  // Nombre de participants 
  const handleParticipantChange = (text) => {
    setDistance(text.replace(/[^0-9]/g, '').slice(0, 3));
  };

  const handleCreate = () => {

    console.log(description, coord.latitude, Date(),coord.longitude,duration, distance )
    fetch(`${BACKEND_ADDRESS}/races`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            author:'64352b27c1b35d60488ebb77',
            admin:'64352b27c1b35d60488ebb77',
            participants:'64352b27c1b35d60488ebb77',
            maxParticipants:10,
            description: description,
            type:'course à pied',
            date: Date(),
            address: 'mon adresse de rdv',
            latitude:coord.latitude,
            longitude:coord.longitude,
            duration: duration,
            distance:distance,
            level:'Débutant',
            dateCreation : Date(),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data){
              console.log(data)
             // console.log(user._id)
              console.log("mongo !")
              navigation.navigate("TabNavigator", { screen: "Map" });
            }
          })   
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Création de course</Text>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Description de votre course :"
          multiline={true}
          maxLength={300}
          value={description}
          onChangeText={handleDescriptionChange}
        />

        <View style={styles.placeView}>
        <Text style={styles.titlePlace}>Adresse : </Text>
        <Text style={styles.place}>Bois de Boulogne, près du lac</Text>
        </View>
        

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Durée"
            maxLength={4}
            value={duration}
            onChangeText={handleDurationChange}
          />
          <Text style={styles.inputText}>minutes</Text>


        </View>



        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Distance"
            maxLength={4} // ajout de la propriété maxLength
            value={distance}
            onChangeText={handleDistanceChange}
          />
          <Text style={styles.inputText}>km</Text>
        </View>
      </View>


      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Niveau :</Text>
       
          <Picker
            style={styles.picker}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Débutant" value="débutant" />
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Confirmé" value="confirmé" />
          </Picker>
       
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          maxLength={4} 
          value={nbrParticipants}
          onChangeText={handleParticipantChange}
        />
        <Text style={styles.inputText}>participants ( 5 maxi ) </Text>
      </View>

      <TouchableOpacity onPress={() => handleCreate()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Créer ma course</Text>
      </TouchableOpacity>


    </View>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '80%',
    fontSize: 36,
    fontWeight: '600',
    color: '#474CCC',
    textAlign: 'center',
  },
  // Description
  textInput: {
    justifyContent:'center',
    alignContent:'center',
    marginTop: 20,
    paddingTop:0,
    minWidth: '80%',
    maxWidth: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: '#474CCC',
    paddingHorizontal: 10,
    paddingVertical: 60,
    fontSize: 16,
    borderRadius: 15,
  },
  // Adresse du parcours
  placeView : {
    flexDirection: 'row',
  },
  titlePlace: {
    marginTop: 20,
    color: '#474CCC',
  },
  place: {
    marginTop: 20,
  },
  // Durée et distance
  inputView: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#474CCC',
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 15,
    textAlign: 'center',
  },
  inputText: {
    marginLeft: 10,
    fontSize: 16,
    // color: ,
    paddingBottom: 6,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
    color: "#474CCC",
    
  },
  picker: {
    flex: 1,
  
    maxWidth: '60%',
    marginHorizontal: 10,
   
  },

  button: {
    width: '70%',
    alignItems: 'center',
    paddingTop: 8,
    marginTop: 50,
    backgroundColor: '#474CCC',
    borderRadius: 50,
    marginBottom: 20,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
})
