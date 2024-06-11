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
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
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
            {team && <ImageBackground style={styles.logo} source={{ uri: team.logo }} />}
          </View>

          <Text style={{ color: '#fff' }}>{driver?.name}</Text>
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
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default DriverDetails;
