import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, Button, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref as dbRef, push as dbPush, set } from 'firebase/database';

const CameraScreen = ({navigation}) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);

    // Save the photo URL to Firebase Realtime Database
    savePhotoUrlToDatabase(newPhoto.uri);

    // Pass the photo data to the MenuScreen
    navigation.navigate('Menu', { photo: newPhoto });
  };

  let sharePic = () => {
    if (photo) {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    }
  };

  let savePhoto = () => {
    if (photo) {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    }
  };

  // Function to save the photo URL to Firebase Realtime Database
  const savePhotoUrlToDatabase = async (photoUrl) => {
    try {
      const database = getDatabase();
      const photosRef = dbRef(database, 'photos'); // Change 'photos' to your desired database path
      const newPhotoRef = dbPush(photosRef);

      // Save the photo URL
      await set(newPhotoRef, { photoUrl });

      console.log('Photo URL saved to the database successfully.');
    } catch (error) {
      console.error('Error saving photo URL to the database:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {photo ? (
        <View>
          <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
          <Button title="Share" onPress={sharePic} />
          {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
          <Button title="Discard" onPress={() => setPhoto(undefined)} />
        </View>
      ) : (
        <Camera style={styles.container} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Take Pic" onPress={takePic} />
          </View>
          <StatusBar style="auto" />
        </Camera>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  preview: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default CameraScreen;