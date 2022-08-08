import React, { useState } from 'react';
import {  View } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';

function EditUnitForm(props) {
  const [name, setName] = useState(props.unit.name);
  const [total, setTotal] = useState(props.unit.total);
  const [built, setBuilt] = useState(props.unit.built);
  const [primed, setPrimed] = useState(props.unit.primed);
  const [painted, setPainted] = useState(props.unit.painted);
  const [uuid, setUuid] = useState(props.unit.uuid);

  const handlePress = (e) => {
    
    let editedUnit = {'name': name, 'total':total, 'built':built, 'primed':primed, 'painted':painted, 'uuid':uuid}

    props.editUnit(editedUnit);
    props.setVisibility();
  }


  return(
    <View>
      <TextInput
        placeholder={name}
        value={name}
        onChangeText={name => setName(name)} />
      <TextInput
        placeholder={total}
        value={total}
        onChangeText={total => setTotal(total)}
      />
      <TextInput
        placeholder={built}
        value={built}
        onChangeText={built => setBuilt(built)}
      />
      <TextInput
        placeholder={primed}
        value={primed}
        onChangeText={primed => setPrimed(primed)}
      />
      <TextInput
        placeholder={painted}
        value={painted}
        onChangeText={painted => setPainted(painted)}
      />
      <Button onPress={handlePress}>
        <Text>Save</Text>
      </Button>
    </View>
  )
}

export default EditUnitForm;