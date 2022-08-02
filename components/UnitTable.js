import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Modal, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { DataTable, DefaultTheme } from 'react-native-paper';



export default function UnitTable(props) {
  
  const unit = props.unit;
  const unitId = props.uuid;
  const universe = JSON.stringify(props.universe);
  const army = props.army;

  return (
    <DataTable>
      <DataTable.Row>
        <DataTable.Cell>Unit Name: </DataTable.Cell>
        <DataTable.Cell onPress={() => props.setVisibility()}>{unit.name}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Total models: </DataTable.Cell>
        <DataTable.Cell onPress={() => alert("I'm pressable!")}>{unit.total}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Built models: </DataTable.Cell>
        <DataTable.Cell onPress={() => alert("I'm pressable!")}>{unit.built}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Primed models: </DataTable.Cell>
        <DataTable.Cell onPress={() => alert("Stop it that tickles!")}>{unit.primed}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Painted models: </DataTable.Cell>
        <DataTable.Cell onPress={() => alert("I'm pressable!")}>{unit.painted}</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
);
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: DefaultTheme.colors.background,
    padding: 10
  },
  card: {
    marginBottom: 10
  }
});