import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

// Import your local images
import RentCarImage from './Images/Rent.webp';
import CancelRentImage from './Images/Cancel.png';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Rental</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Client')}
      >
        <Image
          source={RentCarImage}
          style={styles.menuItemImage}
        />
        <Text style={styles.menuItemText}>Rent a Car</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Camera')}
      >
        <Image
          source={CancelRentImage}
          style={styles.menuItemImage}
        />
        <Text style={styles.menuItemText}>Cancel Rent</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFFFFF',
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    width: '80%',
  },
  menuItemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default MenuScreen;
