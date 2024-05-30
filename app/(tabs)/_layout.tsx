import { Tabs } from 'expo-router';
import { Dimensions } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function TabLayout() {
  const iconSize = 32;
  const activeColor = 'red';
  const inactiveColor = 'white';
  const iconMargin = 0;
  const labelFontSize = 14;
  const headerBackgroundColor = '#1b1b26';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarStyle: {
          backgroundColor: '#1b1b26',
          borderTopColor: 'gray',
          borderTopWidth: 1,
          height: height * 0.15,
        },
        tabBarIconStyle: { marginBottom: iconMargin },
        tabBarLabelStyle: { fontSize: labelFontSize },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'News',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="newspaper"
              size={iconSize}
              color={focused ? activeColor : inactiveColor}
            />
          ),
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: '#fff',
        }}
      />
      <Tabs.Screen
        name="racing"
        options={{
          title: 'Racing',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="flag-checkered"
              size={iconSize}
              color={focused ? activeColor : inactiveColor}
            />
          ),
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: '#fff',
        }}
      />
      <Tabs.Screen
        name="standings"
        options={{
          title: 'Standings',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="racing-helmet"
              size={iconSize}
              color={focused ? activeColor : inactiveColor}
            />
          ),
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: '#fff',
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="favorite-outline"
              size={iconSize}
              color={focused ? activeColor : inactiveColor}
            />
          ),
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: '#fff',
        }}
      />
    </Tabs>
  );
}
