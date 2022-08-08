import React, { useState } from 'react';
import {  View } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';

export default function NotesBox(props) {

  return(
    //display notesbox
    <Card>
      <Card.Title 
        title = "Notes: "
      />
      <Card.Content>
        <Text onPress={() => props.notesVisibility()}>{props.unit.notes}</Text>
      </Card.Content>
    </Card>
  );

}