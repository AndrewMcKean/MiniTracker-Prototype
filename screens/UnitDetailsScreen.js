import React, { useState } from 'react';
import {  SafeAreaView, ScrollView, StyleSheet, View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import UnitTable from '../components/UnitTable';
import EditUnitForm from '../components/EditUnitForm';
import { updateUnit } from '../utilities/StorageFunctions';


export default function UnitDetailsScreen ({route, navigation}) {
  const [unit, setUnit] = useState(route.params.unit);
  const [universe, setUniverse] = useState(route.params.universe);
  const [army, setArmy] = useState(route.params.army);
  const [modalVisible, setModalVisible] = useState(false);
  
  const setVisibility = () => {
    setModalVisible(!modalVisible)
  }

  function editUnit(editedUnit) {
    setUnit(editedUnit);
    
    updateUnit(universe, army, editedUnit);
    //TODO : Add save here
  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.modalView}>
          <EditUnitForm setVisibility={setVisibility} unit={unit} editUnit={editUnit} />
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
          </View>

        </Modal>
        <Image source={require('../assets/breacher.png')} style={styles.image} />
        <UnitTable unit={unit} universe={route.params.universe}  army={route.params.army} setVisibility={setVisibility} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.background,
    paddingTop: 10
  },
  card: {
    width: '90%'
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

/* 

      <Text>Name: {JSON.stringify(name)}</Text>
      <Text>Total: {JSON.stringify(total)}</Text>
      <Text>Built: {JSON.stringify(built)}</Text>
      <Text>Primed: {JSON.stringify(primed)}</Text>
      <Text>Painted: {JSON.stringify(painted)}</Text>
      <Text>UUID: {JSON.stringify(uuid)}</Text>

{
  "Warhammer 40K":{
    "Tau": {
      ""
    }

    "Space Marines": {
      "Unit1": {
        "name": "intercessors",
        "total": 10,
        "built": 5,
        "primed": 5,
        "painted": 0
      }

      "Unit2": {
        "name": "chaplain",
        "total": 1,
        "built": 0,
        "primed": 0,
        "painted": 0,
        "notes": "Equipped with chain sword and meltapistol"
      }
    }
  }
}

*/