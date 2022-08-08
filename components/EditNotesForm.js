import React, { useState } from 'react';
import {  View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

function EditNotesForm(props) {
  const [name, setName] = useState(props.unit.name);
  const [total, setTotal] = useState(props.unit.total);
  const [built, setBuilt] = useState(props.unit.built);
  const [primed, setPrimed] = useState(props.unit.primed);
  const [painted, setPainted] = useState(props.unit.painted);
  const [notes, setNotes] = useState(props.unit.notes);
  const [uuid, setUuid] = useState(props.unit.uuid);

  const handlePress = (e) => {
    
    let editedUnit = {'name': name, 'total':total, 'built':built, 'primed':primed, 'painted':painted, 'notes': notes, 'uuid':uuid}

    props.editUnit(editedUnit);
    props.notesVisibility();
  }


  return(
    <View>
      <TextInput
        placeholder={notes}
        value={notes}
        onChangeText={notes => setNotes(notes)}
        multiline
        numberOfLines={(15)}
      />
      <Button onPress={handlePress}>
        <Text>Save</Text>
      </Button>
    </View>
  )
}

export default EditNotesForm;