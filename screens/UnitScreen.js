import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {  SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import AddUnitForm from '../components/AddUnitForm';
import { saveUnit } from '../utilities/StorageFunctions';
import DeleteUnitButton from  '../components/DeleteUnitButton';
import { useIsFocused } from '@react-navigation/native';

function UnitScreen ({route, navigation}) {
  const [units, setUnits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  //Forces update on 'back' 
  const focus = useIsFocused();

  const universe = route.params.universe;
  let army = route.params.name;

  const addUnit = (unit) => {
    if(units) {
      setUnits(prev => [unit, ...units]);
    } else {
      setUnits([unit]);
    }

    try {
      saveUnit(universe, army, unit);
    } catch  (e) {
      alert(e);
    }
  }

  const updateParentState = (uuidToDelete) => {

    setUnits(prev => (units.filter(unit => unit.uuid !== uuidToDelete)));
  }

  
  useEffect(() => {
    async function fetchData() {
      try {
          let returningUser = await AsyncStorage.getItem('universes');
          let data = JSON.parse(returningUser);
          let hasUnits = data['universes'][universe]['armies'][army]['units'];
          

          if(hasUnits) {
            try {
              setUnits([]);
              data = data['universes'][universe]["armies"][army]["units"];
              let unitKeys = Object.keys(data);
              //DEBUG: Show Data: alert(JSON.stringify(data));

              unitKeys.map((unit) => {
                units ? setUnits(prev => [data[unit], ...prev]) : setUnits(data[unit])
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
  

  const setVisibility = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        >
        <View>
          <View style={styles.modalView}>
            <AddUnitForm setVisibility={setVisibility} addUnit={addUnit} />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
        <View>
          {units ? units.map((unit) => {
              return (
                <Card style={styles.card} key={unit.uuid} onPress={() => navigation.navigate('UnitDetails', {'unit': unit, 'universe': universe, 'army': army})}>
                  <Card.Actions>
                    <Text>{unit.name}</Text>
                    <DeleteUnitButton universe={ universe } army={ army } unit={ unit } updateParentState={ updateParentState }/>
                  </Card.Actions>
                </Card>
              )
          })
          : null}
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Add Unit</Text>
          </Pressable>
          <Pressable onPress={() => alert(JSON.stringify(units))}>
            <Text>Check state</Text>
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
    marginBottom: 10
  },
  centeredView: {
    flex: 1,
    marginTop: 22
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

export default UnitScreen;