import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, fontSize } from '@translate-us/styles';

interface BottomBarProps {
  title: string;
  onPress: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({ title, onPress }) => {
  const [isActive, setActive] = React.useState(false);

  const styles = StyleSheet.create({
    bottomBar: {
      backgroundColor: isActive ? colors.primary[700] : colors.primary[600],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: spacing.xl,
      paddingBottom: spacing['3xl'],
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    text: {
      color: 'white',
      fontSize: fontSize.md,
      textDecorationLine: 'underline',
    },
  });

  return (
    <Pressable
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      onPress={onPress}>
      <LinearGradient
        style={styles.bottomBar}
        colors={[colors.primary[700], colors.primary[600]]}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};
