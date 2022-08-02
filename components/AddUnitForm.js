import React, { useState } from 'react';
import {  StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import UUID from 'react-native-uuid';

function AddUnitForm(props) {
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');
  const [built, setBuilt] = useState('');
  const [primed, setPrimed] = useState('');
  const [painted, setPainted] = useState('');


  const handlePress = (e) => {
    const uuid = UUID.v4();
    
    let unit = {'name': name, 'total':total, 'built':built, 'primed':primed, 'painted':painted, 'uuid':uuid};
    alert(unit.uuid);
    props.addUnit(unit);

    setName('');
    setTotal('');
    setBuilt('');
    setPrimed('');
    setPainted('');

    props.setVisibility();
  }


  return(
    <View>
      <TextInput
        placeholder={"Unit name"}
        value={name}
        onChangeText={name => setName(name)}
      />
      <TextInput
        placeholder={"Total units"}
        value={total}
        onChangeText={total => setTotal(total)}
      />
      <TextInput
        placeholder={"Built units"}
        value={built}
        onChangeText={built => setBuilt(built)}
      />
      <TextInput
        placeholder={"Primed units"}
        value={primed}
        onChangeText={primed => setPrimed(primed)}
      />
      <TextInput
        placeholder={"Painted units"}
        value={painted}
        onChangeText={painted => setPainted(painted)}
      />
      <Button onPress={handlePress}>
        <Text>Save</Text>
      </Button>
    </View>
  )
}

export default AddUnitForm;