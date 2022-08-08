import React from 'react';
import { StyleSheet } from 'react-native';
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
        <DataTable.Cell onPress={() => props.setVisibility()}>{unit.total}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Built models: </DataTable.Cell>
        <DataTable.Cell onPress={() => props.setVisibility()}>{unit.built}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Primed models: </DataTable.Cell>
        <DataTable.Cell onPress={() => props.setVisibility()}>{unit.primed}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Painted models: </DataTable.Cell>
        <DataTable.Cell onPress={() => props.setVisibility()}>{unit.painted}</DataTable.Cell>
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