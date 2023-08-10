import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { spacing } from '@translate-us/styles';

interface LinkProps {
  color: string;
  size: number;
  title: string;
  onPress: () => void;
}

export const Link: React.FC<LinkProps> = ({ color, size, title, onPress }) => {
  const [isPressed, setPressed] = React.useState(false);

  const styles = React.useMemo(() => {
    return StyleSheet.create({
      link: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
      },
      linkText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        color,
        fontSize: size,
        opacity: isPressed ? 0.7 : 1,
      },
    });
  }, [color, size, isPressed]);

  return (
    <Pressable
      style={styles.link}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}>
      <Text style={styles.linkText}>{title}</Text>
    </Pressable>
  );
};
