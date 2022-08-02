import React, { useState } from 'react';
import { View, Stylesheet, Alert} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { deleteUnit } from '../utilities/StorageFunctions';


export default function DeleteUnitButton(props) {
  const [showBox, setShowBox] = useState(false);
  const universe = props.universe;
  const army = props.army;
  const unit = props.unit;
  
  const showConfirmDialog = () =>  {
    return Alert.alert(
      "Are you sure you want to delete?",
      "This cannot be reversed.",
      [
        //Yes button
        {
        text: "Yes",
        onPress: () => {
          setShowBox(false);
          deleteUnit(universe, army, unit);
          props.updateParentState(props.unit.uuid);
        },
      },
      //No button
      {
        text: "No"
      },
      ]
    );
  };
  
  return(
    <Card.Actions>
      <Button onPress={() => showConfirmDialog()}>Delete</Button>
    </Card.Actions>
  )

}