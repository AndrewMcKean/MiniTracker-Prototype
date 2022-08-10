import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = () => {
  try {
    if(text) {
      AsyncStorage.setItem('Warhammer', JSON.stringify(testData));
    }
  }
  
  catch (e) {
    alert(e);
  }

}


const displayData = async() => {
  try {
    let data = await AsyncStorage.getItem('Warhammer');
    data = JSON.parse(data);

    alert(data.Warhammer.SpaceMarines.PrimarisMarines.total);
  }

  catch (e) {
    alert(e);
  }
}


//Universe Screen functions
export async function saveUniverse(universe) {
  try {
    let data = await AsyncStorage.getItem('universes');
    data = JSON.parse(data);

    if(data != null) {
      alert(JSON.stringify(data));
      data['universes'][universe] = {};
    } else {
      data = {'universes': {[universe]: {}}};
    }
    
    data = JSON.stringify(data);

    AsyncStorage.setItem('universes', data);
  } catch (e) {
    alert(e);
  }
} 

export async function deleteUniverse(universe) {
  try {
    
    let key = 'universes';
    let returningUser = await AsyncStorage.getItem(key);
    let data = JSON.parse(returningUser);


    try {
      delete data[key][universe];
      } catch(e) {
        alert(e);
      }
      
      data = JSON.stringify(data);
      AsyncStorage.setItem(key, data);
      alert(universe + " successfully deleted.");
    } catch (e) {
      alert(e);
    }
  }


//Army Screen functions
export async function saveArmy(universe, army) {
  try {
    let key = 'universes';
    let returningUser = await AsyncStorage.getItem(key);
    let data = JSON.parse(returningUser);
    let hasArmies = data[key][universe]['armies'];
    

    if(hasArmies) {
      data[key][universe]['armies'][army] = {};
    } else {
      data[key][universe] = {'armies': {[army]: {}}};
    }

    data = JSON.stringify(data);

    AsyncStorage.setItem(key, data);
  } catch (e) {
    alert(e);
  }
}

export async function deleteArmy(universe, army) {
  try {
    let key = 'universes';
    let returningUser = await AsyncStorage.getItem(key);
    let data = JSON.parse(returningUser);
    
    try {
      delete data[key][universe]["armies"][army];
      } catch(e) {
        alert(e);
      }
      
      data = JSON.stringify(data);
      AsyncStorage.setItem(key, data);
      //alert(army + " successfully deleted."); DEBUG ALERT
    } catch (e) {
      alert(e);
    }
  }

  export async function updateArmy(universe, armyToEdit, editedArmy) {
    try {
      let key = 'universes';
      let returningUser = await AsyncStorage.getItem(key);
      let data = JSON.parse(returningUser);
      let units = data[key][universe]['armies'][armyToEdit];
     
      if(units) {
        data[key][universe]['armies'][editedArmy] = units;
      }
      
      
      data = JSON.stringify(data);
      AsyncStorage.setItem(key, data);
      deleteArmy(universe, armyToEdit);
      
    } catch (e) {
      alert(e);
    }  
  }
  

//Unit screen functions
export async function saveUnit(universe, army, unit) {
  try {
    let key = 'universes';
    let returningUser = await AsyncStorage.getItem(key);
    let data = JSON.parse(returningUser);
    let hasUnits = data[key][universe]['armies'][army]['units'];
    
    if(hasUnits) {
      Object.assign(data[key][universe]['armies'][army]['units'], {[unit.uuid] : unit});
    } else {
      data[key][universe]['armies'][army] = {'units' : {[unit.uuid] : unit}};

    }

    data = JSON.stringify(data);
    AsyncStorage.setItem(key, data);
  } catch (e) {
    alert(e);
  }
}


export async function deleteUnit(universe, army, unit) {
  try {
    let key = 'universes';
    let returningUser = await AsyncStorage.getItem(key);
    let data = JSON.parse(returningUser);

    try {
      delete data[key][universe]["armies"][army]["units"][unit.uuid];
      alert(JSON.stringify(data));
      } catch(e) {
        alert(e);
      }
      
      data = JSON.stringify(data);
      AsyncStorage.setItem(key, data);
      alert(unit.name + " successfully deleted.");
    } catch (e) {
      alert(e);
    }
  }


export async function updateUnit(universe, army, editedUnit) {
  try {
    let key = 'universes';
    let returningUser = await AsyncStorage.getItem(key);
    let data = JSON.parse(returningUser);
    let hasUnits = data[key][universe]['armies'][army]['units'];
    
    const uuid = editedUnit.uuid;

    if(hasUnits) {
      data[key][universe]['armies'][army]['units'][uuid] = editedUnit;
    }

    data = JSON.stringify(data);
    AsyncStorage.setItem(key, data);
  } catch (e) {
    alert(e);
  }  
}



export function clearStorage() {
  AsyncStorage.clear();
}
/*
{
  "Warhammer": [{"Tau": []}, {"Space Marines:" []}}]
}

{
  "Warhammer": {"Armies": {"Tau": {things}, {"Space Marines" : {andStuff}}}
}
*/