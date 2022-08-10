


export default function armyModal (props) {


  return(
      <Modal
      animationType="slide"
      transparent={true}
      visible={props.armyModal}
      onRequestClose={() => {
        props.setArmyModal(!(props.armyModal));
      }}
      >
      <View style={styles.modalView}>
        <EditArmyForm armyVisibility = { armyVisibility } updateArmy = { updateArmy } />
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => armyVisibility(!armyModal)}
        >
          <Text style={styles.textStyle}>Cancel</Text>
        </TouchableOpacity>
        </View>

      </Modal>
  );
}