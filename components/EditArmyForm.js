import React, { useState } from 'react';
import {  View } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';

function EditArmyForm(props) {

  const [army, setArmy] = useState(props.army);

  const handlePress = (e) => {
    
    props.editArmy(props.army, army);
    props.setModalVisibility(false);
  }


  return(
    <View>
      <TextInput
        placeholder={army}
        onChangeText={army => setArmy(army)} />
      <Button onPress={handlePress}>
        <Text>Save</Text>
      </Button>
    </View>
  )
}

export default EditArmyForm;