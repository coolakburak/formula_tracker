import { useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Container, DriverCard } from '~/components';
import { fetchDrivers } from '~/api/get';
import { DriverRanking } from '~/types/driverRanking.types';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const Standings = () => {
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    setLoading(true);

    if (animation.current) {
      animation.current.play();
    }

    fetchDrivers().then((data) => {
      if (data) {
        setDrivers(data?.response);
        setLoading(false);

        if (animation.current) {
          animation.current.pause();
        }
      }
    });
  }, []);

  return (
    <Container>
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

      <FlatList
        data={drivers}
        renderItem={({ item, index }) => (
          <DriverCard
            key={item?.driver?.id}
            name={item?.driver?.name}
            number={item?.driver?.number}
            team={item?.team}
            image={item?.driver?.image}
            teamLogo={item?.team?.logo}
            index={index}
          />
        )}
        contentContainerStyle={{ alignItems: 'center' }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        scrollEnabled
      />
    </Container>
  );
};

const styles = StyleSheet.create({
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

export default Standings;
