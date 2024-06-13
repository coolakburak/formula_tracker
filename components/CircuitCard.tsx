import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { BounceInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { teamColors } from '~/constants/TeamColors';

interface ICircuitCardProps {
  id: number;
  name: string;
  image: string;
  first_grand_prix?: number;
  laps?: number;
  length: string;
  race_distance?: string;
  capacity?: number;
  opened?: number;
  owner?: string;
}

const CircuitCard: React.FC<ICircuitCardProps> = ({ id, name, image, laps, length }) => {
  return (
    <Animated.View entering={BounceInRight.delay(400 * (id + 1))}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={[styles.container, { backgroundColor: 'blue' }]}
        colors={['rgba(0,0,0,0.7)', 'transparent']}>
        <View style={styles.circuitContainer}>
          <Text style={styles.circuitName}>{name}</Text>
          <View>
            <Text style={styles.circuitLaps}>{laps}</Text>
            <Text style={styles.circuitLength}>{length}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} resizeMode="contain" height={160} width={200} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default CircuitCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 4,
    borderRadius: 10,
  },
  circuitContainer: {
    width: '45%',
  },

  circuitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  circuitLaps: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  circuitLength: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
