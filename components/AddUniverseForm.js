import React, { useState } from 'react';
import {  StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';

function AddUniverseForm(props) {
  const [text, setText] = useState('');

  const handlePress = (e) => {
    const universe = text;
    
    props.addUniverse(universe);
    setText('');
  }


  return(
    <Card>
      <Card.Content>
        <TextInput
          placeholder={"Add universe"}
          value={text}
          onChangeText={text => setText(text)}
        />
        <Button contained onPress={handlePress}>
          <Text>Add Universe</Text>
        </Button>
      </Card.Content>
    </Card>
  )
}

export default AddUniverseForm;