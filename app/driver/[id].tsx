import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState, useRef } from 'react';

// Navigation
import { useLocalSearchParams } from 'expo-router';

// Api
import { fetchDriverById } from '~/api/get';

// Types
import { DriverDetail } from '~/types/driverDetails.types';

// Animation
import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get('window');

const DriverDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const animation = useRef<LottieView>(null);
  const [driver, setDriver] = useState<DriverDetail | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchDriverById(id).then((data) => {
        if (data) {
          setDriver(data?.response[0]);
          setLoading(false);
        }
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.animationContainer}>
          <LottieView
            ref={animation}
            loop
            autoPlay
            style={styles.animation}
            source={require('~/assets/animations/checkered-flag.json')}
          />
        </View>
      )}
      <View style={styles.header}>
        <Text style={{ color: 'white' }}>{driver?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    width,
    height: height * 0.3,
    backgroundColor: 'red',
  },
  animationContainer: {
    flex: 1,
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default DriverDetails;
