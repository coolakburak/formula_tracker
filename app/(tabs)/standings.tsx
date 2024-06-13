import { useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
// Components
import { Container, DriverCard } from '~/components';

// Icons
import { Entypo } from '@expo/vector-icons';

// Api
import { fetchDrivers } from '~/api/get';

// Types
import { DriverRanking } from '~/types/driverRanking.types';

// Animation
import LottieView from 'lottie-react-native';

// Navigation
import { useRouter } from 'expo-router';

// Picker
import SelectDropdown from 'react-native-select-dropdown';

const { width } = Dimensions.get('window');

const Standings = () => {
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [season, setSeason] = useState<string>('2024');
  const [loading, setLoading] = useState(true);
  const animation = useRef<LottieView>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    if (animation.current) {
      animation.current.play();
    }

    fetchDrivers(season).then((data) => {
      if (data) {
        setDrivers(data?.response);
        setLoading(false);

        if (animation.current) {
          animation.current.pause();
        }
      }
    });
  }, [season]);

  const seasons = [
    {
      title: '2024',
    },
    {
      title: '2023',
    },
    {
      title: '2022',
    },
    {
      title: '2021',
    },
    {
      title: '2020',
    },
  ];

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
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          backgroundColor: 'transparent',
          zIndex: 1000,
        }}>
        <SelectDropdown
          data={seasons || []}
          onSelect={(selectedItem, index) => {
            setSeason(selectedItem?.title);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem?.title) || seasons[0]?.title || 'Teams'}
                </Text>
                <Entypo
                  name={isOpened ? 'chevron-small-up' : 'chevron-small-down'}
                  color="black"
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: '#D2D9DF' }),
                }}>
                <Text style={styles.dropdownItemTxtStyle}>{item?.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>

      <FlatList
        key={season}
        data={drivers}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/driver/${item?.driver?.id}`,
                params: {
                  season: season,
                },
              })
            }>
            <DriverCard
              key={`${season}-${item?.driver?.id}`}
              name={item?.driver?.name}
              number={item?.driver?.number}
              team={item?.team}
              image={item?.driver?.image}
              teamLogo={item?.team?.logo}
              index={index}
            />
          </Pressable>
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

  // Dropdown
  dropdownButtonStyle: {
    width: width / 4,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default Standings;
