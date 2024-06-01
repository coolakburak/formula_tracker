import { Text, View, FlatList } from 'react-native';
import { Container, DriverCard } from '~/components';

const mockData = [
  {
    id: 1,
    name: 'Lewis Hamilton',
    number: 44,
    team: 'Mercedes',
    image: 'https://media.api-sports.io/formula-1/drivers/20.png',
    teamLogo: 'https://media.api-sports.io/formula-1/teams/5.png',
  },
];

const Standings = () => {
  return (
    <Container>
      <FlatList
        data={mockData}
        renderItem={({ item }) => (
          <DriverCard
            key={item.id}
            name={item?.name}
            number={item?.number}
            team={item?.team}
            image={item?.image}
            teamLogo={item?.teamLogo}
          />
        )}
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
      />
    </Container>
  );
};

export default Standings;
