import React, { useEffect, useState, useRef } from 'react';

import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
// import CameraRoll from '@react-native-community/cameraroll';

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const camera = useRef(null);


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();

      if (cameraPermission === 'authorized') {
        setAuthorized(true);
      } else if (
        cameraPermission === 'not-determined' ||
        cameraPermission === 'denied'
      ) {
        console.log('goo');
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log('newCameraPermission', newCameraPermission);
        if (newCameraPermission === 'authorized') {
          setAuthorized(true);
        }
      }
    })();
  }, []);

  console.log('authorized', authorized);
  console.log('device', device);

  if (device === undefined || !authorized) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <Text>unsupported device</Text>
      </SafeAreaView>
    );
  }

  const onTakePhoto = async () => {
    try {
      const option = {
        flash: true
      };
      const photo = await camera.current.takePhoto(option);
      // setPhotoCaptured(photo.path); // có ảnh rồi thì làm gì thì làm
      // CameraRoll.save(photo.path, { // đoạn này để lưu vào photo app (galery )của điện thoại
      //   type: 'photo', // optional
      //   album: 'CameraApp', // optional
      // });
    } catch (error) {

    }
  };

  return (
    <View style={styles.wrapper}>
      <Camera
        style={[styles.container]}
        device={device}
        isActive={authorized}
      />
      <TouchableOpacity onPress={onTakePhoto} style={styles.btnTake}>
        <Text>Chup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  btnTake: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    left: '45%',
    zIndex: 2,
    height: 50,
    width: 50,
    backgroundColor: 'red'
  },
});