import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {  SafeAreaView, ScrollView, StyleSheet, View, FlatList,  Pressable } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import AddArmyForm from '../components/AddArmyForm';
import { saveArmy } from '../utilities/StorageFunctions';
import DeleteArmyButton from '../components/DeleteArmyButton';

function ArmyScreen ({route, navigation }) {

  const [armies, setArmies] = useState([]);
  const universe = route.params.name;

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

  const updateParentState = (armyToDelete) => {

    setArmies(prev => (armies.filter(army => army !== armyToDelete)));
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
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View>
        {armies ? armies.map((army) => {
            return (
              <Card style={styles.card} key={army} onPress={() => navigation.navigate('Unit', {'universe': universe, 'name': army})}>
                <Card.Actions>
                  <Text>{army}</Text>
                  <DeleteArmyButton universe={ universe } army= { army } updateParentState={ updateParentState }/>
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
    marginBottom: 10
  }
});

export default ArmyScreen;

//onPress={() => navigation.navigate('Army')}