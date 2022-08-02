import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import { clearStorage } from '../utilities/StorageFunctions'

function HomeScreen ({navigation}) {
  

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.welcome}>
            Welcome to MiniTracker!
          </Text>
          <Card style={styles.card} onPress={() => navigation.navigate('Universes')}>
            <Card.Content>
              <Text>Universes</Text>
            </Card.Content>
          </Card>
          <Card style={styles.card} onPress={clearStorage}>
            <Card.Content>
              <Text>Clear Storage</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.background,
    padding: 10
  },
  card: {
    marginBottom: 10
  },
  welcome: {
    alignSelf: 'center'
  }
});

export default HomeScreen;
