import React, { useState } from 'react';
import {  StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';


export default function ModelScreen ({route, navigation}) {
  const {name, total, built, primed, painted} = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="This is the Model Screen" />
      </Card>
      <Text>Name: {JSON.stringify(name)}</Text>
      <Text>Total: {JSON.stringify(total)}</Text>
      <Text>Built: {JSON.stringify(built)}</Text>
      <Text>Primed: {JSON.stringify(primed)}</Text>
      <Text>Painted: {JSON.stringify(painted)}</Text>
    </View>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: DefaultTheme.colors.background,
    alignItems: 'center',
    paddingTop: 10
  },
  card: {
    width: '90%'
  }
});

/* 

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
