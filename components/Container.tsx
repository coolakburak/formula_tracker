import { StyleSheet, View } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#000',
  },
});
