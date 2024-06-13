import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Circuit } from '~/types/circuits.types';
import { fetchCircuitsById } from '~/api/get';

const CircuitDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [circuit, setCircuit] = useState<Circuit | undefined>();

  useEffect(() => {
    if (id) {
      fetchCircuitsById(id).then((data) => {
        if (data) {
          setCircuit(data?.response[0]);
        }
      });
    }
  }, []);

  return (
    <View key={circuit?.id} style={styles.container}>
      <Text style={styles.circuitName}>{circuit?.name}</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: circuit?.image }} width={500} height={350} resizeMode="contain" />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.circuitText}>Laps {circuit?.laps}</Text>
        <Text style={styles.circuitText}>Length {circuit?.length}</Text>
        <Text style={styles.circuitText}>Race Distance {circuit?.race_distance}</Text>
        <Text style={styles.circuitText}>Opened in {circuit?.opened}</Text>
      </View>
    </View>
  );
};

export default CircuitDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 30,
    width: '95%',
    left: '2.5%',
  },
  descriptionContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 40,
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#333',
  },
  circuitName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  circuitText: {
    color: '#fff',
    textAlign: 'center',
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    fontSize: 16,
  },
});
