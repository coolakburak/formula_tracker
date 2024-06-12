// import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
// import { useEffect, useState, useRef } from 'react';

// // Navigation
// import { useLocalSearchParams } from 'expo-router';

// // Api
// import { fetchDriverById } from '~/api/get';

// // Types
// import { DriverDetail, Team, Team2 } from '~/types/driverDetails.types';

// // Animation
// import LottieView from 'lottie-react-native';
// import { teamColors } from '~/constants/TeamColors';

// const { height, width } = Dimensions.get('window');

// const DriverDetails = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const animation = useRef<LottieView>(null);
//   const [driver, setDriver] = useState<DriverDetail | undefined>();
//   const [team, setTeam] = useState<Team2 | undefined>();
//   const [season, setSeason] = useState<Team | undefined>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       setLoading(true);
//       fetchDriverById(id).then((data) => {
//         if (data) {
//           setDriver(data?.response[0]);
//           console.log(data.response[0].teams[0].team.logo);

//           if (data?.response[0]?.teams?.filter((team) => team.season?.toString() === '2023')) {
//             setTeam(
//               data?.response[0]?.teams?.filter((team) => team.season?.toString() === '2023')[0].team
//             );
//           }
//           setLoading(false);
//         }
//       });
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       {loading && (
//         <View style={styles.animationContainer}>
//           <LottieView
//             ref={animation}
//             loop
//             autoPlay
//             style={styles.animation}
//             source={require('~/assets/animations/checkered-flag.json')}
//           />
//         </View>
//       )}
//       <View style={styles.header}>
//         <View style={styles.logoContainer}>
//           {team && <ImageBackground style={styles.logo} source={{ uri: team?.logo }} />}
//         </View>

//         <Text style={{ color: 'white' }}>{driver?.name}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     width,
//     height: height * 0.3,
//   },
//   animationContainer: {
//     flex: 1,
//     width: 250,
//     height: 250,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },
//   animation: {
//     width: '100%',
//     height: '100%',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: teamColors['Mercedes'] || '#DC0000',
//   },
//   logo: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default DriverDetails;
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';

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

const { height, width } = Dimensions.get('window');

const DriverDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const animation = useRef<LottieView>(null);
  const [driver, setDriver] = useState<DriverDetail | undefined>();
  const [team, setTeam] = useState<Team2 | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchDriverById(id).then((data) => {
        if (data) {
          const driverData = data?.response[0];

          setDriver(driverData);

          const teamData = driverData?.teams?.find((team) => team?.season?.toString() === '2023');
          if (teamData) {
            setTeam(teamData?.team);
          }

          setLoading(false);
        }
      });
    }
  }, [id]);

  const teamColor = teamColors[team?.name || ''] || '#DC0000';

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
        <View style={[styles.header, { backgroundColor: teamColor }]}>
          <View style={styles.logoContainer}>
            {team && (
              <ImageBackground
                style={styles.logo}
                resizeMode="contain"
                source={{ uri: team.logo }}
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
  },
  headerDebut: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
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
});

export default DriverDetails;
