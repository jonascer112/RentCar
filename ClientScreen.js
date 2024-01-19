import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { getDatabase, ref, set, push } from 'firebase/database';
import { app, auth, db } from './firebaseConfig';

// Import your local images
import CarAPhoto from './Cars/CarA.jpg';
import CarBPhoto from './Cars/CarB.jpg';

const CarRentalScreen = ({ navigation, route }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [availableCars, setAvailableCars] = useState([]);

  useEffect(() => {
    const initialCars = [
      {
        id: '1',
        carModel: 'Audi A3 Sportback',
        numberOfSeats: '5',
        rentalPrice: '150$',
        photo: CarAPhoto,
      },
      {
        id: '2',
        carModel: 'BMW I7 M70',
        numberOfSeats: '4',
        rentalPrice: '165$',
        photo: CarBPhoto,
      },
    ];

    setAvailableCars(initialCars);
  }, []);

  const rentSelectedCar = async () => {
    if (selectedCar) {
      try {
        const rentalsRef = ref(db, 'rentalsData');
        const newRentalRef = push(rentalsRef);

        const rentalData = {
          carModel: selectedCar.carModel,
          numberOfSeats: selectedCar.numberOfSeats,
          rentalPrice: selectedCar.rentalPrice,
          // Add more key-value pairs as needed
        };

        await set(newRentalRef, rentalData);

        console.log('Car rented successfully.');
      } catch (error) {
        console.error('Error renting car:', error.message);
      }
    } else {
      console.warn('Please select a car.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carItem}
      onPress={() => setSelectedCar(item)}
    >
      <Image
        source={item.photo}
        style={styles.carPhoto}
      />
      <Text style={styles.carModel}>{item.carModel}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Rental Menu</Text>

      <FlatList
        data={availableCars}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.carList}
      />

      {selectedCar && (
        <View style={styles.selectedCarDetails}>
          <Text>Selected Car: {selectedCar.carModel}</Text>
          <Text>Number of Seats: {selectedCar.numberOfSeats}</Text>
          <Text>Rental Price: {selectedCar.rentalPrice}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.rentButton}
        onPress={rentSelectedCar}
        disabled={!selectedCar}
      >
        <Text style={styles.rentButtonText}>Rent Selected Car</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  carList: {
    width: '80%',
  },
  carItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  carPhoto: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  carModel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedCarDetails: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  rentButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  rentButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CarRentalScreen;
