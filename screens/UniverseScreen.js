import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {  SafeAreaView, ScrollView, StyleSheet, View, FlatList,  Pressable } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import AddUniverseForm from '../components/AddUniverseForm';
import { saveUniverse } from '../utilities/StorageFunctions';
import DeleteUniverseButton from '../components/DeleteUniverseButton';

function UniverseScreen ({ navigation }) {

  const [universes, setUniverses] = useState([]);

  const addUniverse = (universe) => {
    if(universes) {
      setUniverses(prev => [universe, ...prev]);
    } else {
      setUniverses([universe]);
    }

    try {
      saveUniverse(universe);
    } catch (e) {
      alert(e);
    }
  }

  
  useEffect(() => {
    async function fetchData() {
      try {
          let returningUser = await AsyncStorage.getItem('universes');
          let data = JSON.parse(returningUser);
          let hasUniverses = data;

          if(hasUniverses) {
            setUniverses([]);
            let universeKeys = Object.keys(data["universes"]);

            try {  
              universeKeys.map((universe) => {
                  universes ? setUniverses(prev => [universe, ...prev]) : setUniverses([universe])
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

  const updateParentState = (universeToDelete) => {
    setUniverses(prev => (universes.filter(universe => universe !== universeToDelete)));
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
        {universes ? universes.map((universe) => {
                  return (
                    <Card style={styles.card} key={universe} onPress={() => navigation.navigate('Army', {'name': universe})}>
                      <Card.Actions>
                        <Text>{universe}</Text>
                        <DeleteUniverseButton universe={universe} updateParentState={updateParentState} />
                      </Card.Actions>
                    </Card>
                  )
              })
              : null }
          <AddUniverseForm addUniverse={addUniverse} />
          <Pressable onPress={() => alert(universes)}>
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
  },
  card: {
    marginBottom: 10
  }
});

export default UniverseScreen;

//onPress={() => navigation.navigate('Army')}
/*
      <FlatList
        data={universes}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('Army', {'name': item})}>
            <Card.Actions>
              <Text>{ item }</Text>
              <DeleteUniverseButton universe={ item } updateParentState={ updateParentState }/>
            </Card.Actions>
          </Card>
          )}
        />
        <View>



*/