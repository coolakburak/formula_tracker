import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Types
import { Team } from '~/types/driverRanking.types';

// Constants
import { teamColors } from '~/constants/TeamColors';

// Animation
import Animated, { BounceInRight } from 'react-native-reanimated';

interface IDriverCardProps {
  name: string;
  number: number;
  team: Team;
  image: string;
  teamLogo: string;
  index: number;
}

const { width, height } = Dimensions.get('window');
const cardHeight = height * 0.2;

export const DriverCard: React.FC<IDriverCardProps> = ({
  name,
  number,
  team,
  image,
  teamLogo,
  index,
}) => {
  const seperatedName = name.split(' ');
  const firstName = seperatedName[0];
  const lastName = seperatedName[1];
  const teamColor = teamColors[team.name] || '#DC0000';

  return (
    <Animated.View entering={BounceInRight.delay(400 * (index + 1))}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={[styles.container, { backgroundColor: teamColor }]}
        colors={['rgba(0,0,0,0.7)', 'transparent']}>
        <View style={styles.driverInfo}>
          <Text style={styles.driverNumber}>{number}</Text>
          <View>
            <Text style={styles.driverFirstName}>{firstName}</Text>
            <Text style={styles.driverLastName}>{lastName}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} resizeMode="cover" height={160} width={140} />
        </View>
        <Image source={{ uri: teamLogo }} style={styles.teamLogo} resizeMode="contain" />
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.92,
    height: cardHeight,
    borderRadius: 18,
    paddingTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  driverInfo: {
    marginLeft: 20,
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  driverNumber: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  driverFirstName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '400',
  },
  driverLastName: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignSelf: 'flex-end',
  },
  image: {
    aspectRatio: 1,
  },
  teamLogo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: width * 0.5,
    height: cardHeight * 0.4,
    opacity: 0.2,
    transform: [{ translateX: -width * 0.25 }, { translateY: -cardHeight * 0.25 }],
  },
});
