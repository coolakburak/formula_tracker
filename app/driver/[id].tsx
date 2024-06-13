// export default DriverDetails;
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';

// Icons
import { Entypo } from '@expo/vector-icons';

// Navigation
import { useLocalSearchParams } from 'expo-router';

// Api
import { fetchDriverById } from '~/api/get';

// Types
import { DriverDetail, Team, Team2 } from '~/types/driverDetails.types';

// Animation
import LottieView from 'lottie-react-native';

// Team Colors
import { teamColors } from '~/constants/TeamColors';

// Picker
import SelectDropdown from 'react-native-select-dropdown';

const { height, width } = Dimensions.get('window');

const DriverDetails = () => {
  const { id, season } = useLocalSearchParams<{ id: string; season: string }>();
  const animation = useRef<LottieView>(null);
  const [driver, setDriver] = useState<DriverDetail | undefined>();
  const [team, setTeam] = useState<Team2 | undefined>();
  const [seasons, setSeasons] = useState<Team | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchDriverById(id).then((data) => {
        if (data) {
          const driverData = data?.response[0];

          setDriver(driverData);

          const selectedSeason = driverData?.teams?.find(
            (team) => team?.season?.toString() === season
          );

          setSeasons(selectedSeason);

          const teamData = driverData?.teams?.find((team) => team?.season?.toString() === '2024');
          if (teamData) {
            setTeam(teamData?.team);
          }

          setLoading(false);
        }
      });
    }
  }, [id]);

  const teamColor = teamColors[seasons?.team?.name || ''] || '#DC0000';

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.animationContainer}>
          <LottieView
            ref={animation}
            loop
            autoPlay
            style={styles.animation}
            source={require('~/assets/animations/checkered-flag.json')}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={[styles.header, { backgroundColor: teamColor }]}>
            <View style={styles.logoContainer}>
              {team && (
                <ImageBackground
                  style={styles.logo}
                  resizeMode="contain"
                  source={{ uri: seasons?.team?.logo }}
                />
              )}
            </View>
            <View style={styles.driverContainer}>
              <View style={styles.driverInfo}>
                <Text style={styles.driverNumber}>{driver?.number}</Text>
                <Text style={styles.driverName}>{driver?.name}</Text>
              </View>
              <View>
                <Image
                  style={styles.driverPhoto}
                  source={{ uri: driver?.image }}
                  resizeMode="cover"
                  height={160}
                  width={140}
                />
              </View>
            </View>
          </View>
          <View style={styles.driverInfoContainer}>
            <Text style={styles.headerDebut}>Since Debut</Text>
            <View style={styles.driverPerformanceContainer}>
              <View style={styles.performanceContainer}>
                <Text style={styles.driverScore}>{driver?.podiums}</Text>
                <Text style={{ color: 'white' }}>Podiums</Text>
              </View>
              <View style={styles.performanceContainer}>
                <Text style={styles.driverScore}>{driver?.world_championships}</Text>
                <Text style={{ color: 'white' }}>Titles</Text>
              </View>
              <View style={styles.performanceContainer}>
                <Text style={styles.driverScore}>{driver?.career_points}</Text>
                <Text style={{ color: 'white' }}>Career Points</Text>
              </View>
            </View>
          </View>
          <View style={{ width: width / 4, marginTop: 12 }}>
            <SelectDropdown
              data={driver?.teams || []}
              onSelect={(selectedItem, index) => {
                setSeasons(selectedItem);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem?.season) || seasons?.season || 'Teams'}
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
                    <Text style={styles.dropdownItemTxtStyle}>{item?.season}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>
          <View
            style={{
              backgroundColor: teamColors[seasons?.team?.name || ''] || '#DC0000',
              borderRadius: 24,
              marginTop: 28,
            }}>
            <Image
              source={{
                uri: seasons?.team?.logo,
              }}
              resizeMode="contain"
              style={{
                width: '100%',
                height: 200,
              }}
            />
          </View>
        </View>
      )}
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
    alignItems: 'center',
    justifyContent: 'center',
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
  logoContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    top: 120,
    opacity: 0.3,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    height: height * 0.3,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right: 40,
  },
  driverName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    flexDirection: 'column',
    width: '45%',
  },
  driverNumber: {
    color: 'white',
    fontSize: 70,
    fontWeight: 'bold',
    marginRight: 10,
  },
  driverPhoto: {
    width: 140,
    height: 160,
    borderRadius: 10,
    bottom: 12,
    right: 20,
  },
  driverInfoContainer: {
    width: width,
    marginTop: 24,
  },
  headerDebut: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    alignItems: 'flex-start',
  },
  driverPerformanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width * 0.9,
    height: height * 0.1,
  },
  performanceContainer: {
    borderLeftWidth: 3,
    borderColor: 'red',
    padding: 10,
  },
  driverScore: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
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
    marginTop: 20,
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

export default DriverDetails;
