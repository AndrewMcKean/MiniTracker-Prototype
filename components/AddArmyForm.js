import React, { useState } from 'react';
import { Text, Button, Card, TextInput } from 'react-native-paper';

function AddArmyForm(props) {
  const [text, setText] = useState("");

  const handlePress = (e) => {
    const army = text;

    props.addArmy(army);
    setText('');
  }

  return(
    <Card>
      <Card.Content>
        <TextInput
          placeholder={"Army name"}
          value={text}
          onChangeText={text => setText(text)}
        />
        <Button contained onPress={handlePress}>
          <Text>Add Army</Text>
        </Button>
      </Card.Content>
    </Card>
  )
}

export default AddArmyForm;