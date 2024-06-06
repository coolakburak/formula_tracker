import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { fetchCircuits } from '~/api/get';
import { Container } from '~/components';
import CircuitCard from '~/components/CircuitCard';
import { Circuit } from '~/types/circuits.types';

export default function News() {
  const [circuits, setCircuits] = useState<Circuit[]>([]);

  useEffect(() => {
    fetchCircuits().then((data) => {
      if (data) {
        setCircuits(data?.response);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={circuits}
        renderItem={({ item }) => (
          <CircuitCard
            id={item.id}
            name={item.name}
            image={item.image}
            first_grand_prix={item.first_grand_prix}
            laps={item.laps}
            length={item.length}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
});
