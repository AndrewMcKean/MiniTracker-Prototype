import React from 'react';
import {  StyleSheet, View, } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function Universe(props) {
  const [universe] = props;
  const navigation = useNavigation();

  return(
    <View>
      <Card key={universe.name} style={styles.card} onPress={() => navigation.navigate('Army', universe)}>
        <Card.Content>
          <Text>{universe.name}</Text>
        </Card.Content>
      </Card>
    </View>
  )
}

export default Universe;
