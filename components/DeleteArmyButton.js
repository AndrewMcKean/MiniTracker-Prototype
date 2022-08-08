import React, { useState } from 'react';
import { Alert} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { deleteArmy } from '../utilities/StorageFunctions';


export default function DeleteArmyButton(props) {
  const [showBox, setShowBox] = useState(false);
  const universe = props.universe;
  const army = props.army;
  
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
          deleteArmy(universe, army);
          props.updateParentState(props.army);
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