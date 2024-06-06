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
      <View style={styles.imageContainer}>
        <Image source={{ uri: circuit?.image }} width={300} height={300} resizeMode="contain" />
      </View>
      <Text style={styles.circuitName}>{circuit?.name}</Text>
      <Text style={styles.circuitText}>{circuit?.first_grand_prix}</Text>
      <Text style={styles.circuitText}>Laps {circuit?.laps}</Text>
      <Text style={styles.circuitText}>Length {circuit?.length}</Text>
      <Text style={styles.circuitText}>Race Distance {circuit?.race_distance}</Text>
      <Text style={styles.circuitText}>Circuit Capacity {circuit?.capacity}</Text>
      <Text style={styles.circuitText}>Opened in {circuit?.opened}</Text>
      <Text style={styles.circuitText}>Owner {circuit?.owner}</Text>
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
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '70%',
    left: '15%',
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
  },
});
