import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#1822db',
    justifyContent: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressable: {
    height: 50,
    width: 250,
    backgroundColor: '#ffd700',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  marginVertical10: {
    marginVertical: 10,
  },
});

export default styles;
