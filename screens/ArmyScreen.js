import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {  SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import AddArmyForm from '../components/AddArmyForm';
import EditArmyForm from '../components/EditArmyForm';
import { deleteArmy, saveArmy, updateArmy } from '../utilities/StorageFunctions';
import DeleteArmyButton from '../components/DeleteArmyButton';
import { useIsFocused } from '@react-navigation/native';

function ArmyScreen ({route, navigation }) {

  const [armies, setArmies] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const universe = route.params.name;
  const [armyToEdit, setArmyToEdit] = useState('');
  
  //Forces update on 'back'
  const focus = useIsFocused();

  const addArmy = (army) => {
    if(armies) {
      setArmies(prev => [army, ...prev]);
    } else {
      setArmies([army]);
    }

    
    try {
      saveArmy(universe, army);
    } catch (e) {
      alert(e);
    }
    
  }
  
  function editArmy(armyToEdit, editedArmy) {
    //Remove the armyToEdit from state
    setArmies(prev => (armies.filter(army => army !== armyToEdit)));

    //Add the edited army to state - Note, has to be done in this order to trigger proper re-renders
    setArmies(prev => [editedArmy, ...prev]);


    try {
      updateArmy(universe, armyToEdit, editedArmy);
    } catch (e) {
      alert(e);
    }

    //Remove the armyToEdit from state

  }
  

  const updateParentState = (armyToDelete) => {

    setArmies(prev => (armies.filter(army => army !== armyToDelete)));
  }

  function triggerModal(army) {
    setModalVisibility(!modalVisibility);
    setArmyToEdit(army);
  }

  
  useEffect(() => {
    async function fetchData() {
      try {
          let returningUser = await AsyncStorage.getItem('universes');
          let data = JSON.parse(returningUser);
          let hasArmies = data['universes'][universe]['armies'];


          if(hasArmies) {
            try {
              setArmies([]);
                let armyKeys = Object.keys(data['universes'][universe]['armies']);
                
                armyKeys.map((army) => {
                    armies ? setArmies(prev => [army, ...prev]) : setArmies(army)
                  });
                } catch (e) {
                  alert(e);
                }
            }
          } catch (e) {
          alert(e);
        }
      }

    fetchData();
  }, [focus])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibility}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibility(!modalVisibility);
          }}
        >
        <View>
          <View style={styles.modalView}>
            <EditArmyForm setModalVisibility={setModalVisibility} editArmy = {editArmy} army = {armyToEdit} />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisibility(!modalVisibility)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
        <View>
          {armies ? armies.map((army) => {
              return (
                <Card style={styles.card} key={army} 
                  onPress={() => navigation.navigate('Unit', {'universe': universe, 'name': army})}>
                  <Card.Actions>
                    <Text>{army}</Text>
                    <DeleteArmyButton 
                      universe = { universe } 
                      army = { army } 
                      updateParentState={ updateParentState }/>
                    <Pressable onPress={() => triggerModal(army)}><Text>Update army</Text></Pressable>
                  </Card.Actions>
                </Card>
              )
          })
          : null}
          <AddArmyForm addArmy={addArmy} />
          <Pressable onPress={() => alert(armies)}>
            <Text>Check status</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles= StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
    padding: 10
  },
  card: {
    marginBottom: 10,
  },
  image: {
    maxWidth: 400,
    maxHeight: 300
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "black",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ArmyScreen;

//onPress={() => navigation.navigate('Army')}