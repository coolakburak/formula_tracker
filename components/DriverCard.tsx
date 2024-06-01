import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface IDriverCardProps {
  name: string;
  number: number;
  team: string;
  image: string;
  teamLogo: string;
}

const { width, height } = Dimensions.get('window');
const cardHeight = height * 0.2;

export const DriverCard: React.FC<IDriverCardProps> = ({ name, number, team, image, teamLogo }) => {
  const seperatedName = name.split(' ');
  const firstName = seperatedName[0];
  const lastName = seperatedName[1];

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: cardHeight,
    borderRadius: 12,
    paddingTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#108a7f',
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
});
