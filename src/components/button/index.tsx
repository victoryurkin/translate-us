import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { spacing, colors, fontSize, border } from '@translate-us/styles';

interface ButtonProps {
  title: string;
  type?: 'primary' | 'default' | 'link';
  block?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = 'primary',
  block = false,
}) => {
  const [isActive, setActive] = React.useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {
      display: !block ? 'flex' : undefined,
      flexDirection: !block ? 'row' : undefined,
    },
    button: {
      backgroundColor: (() => {
        switch (type) {
          case 'primary':
            return isActive ? colors.primary[800] : colors.primary[600];
          default:
            return isActive ? colors.secondary[100] : undefined;
        }
      })(),
      borderWidth: type === 'default' ? border.width : undefined,
      borderColor: type === 'default' ? colors.secondary[800] : undefined,
      borderRadius: border.radius,
      paddingHorizontal: spacing['4xl'],
      paddingVertical: spacing.lg,
    },
    text: {
      color: type === 'primary' ? 'white' : colors.secondary[800],
      textDecorationLine: type === 'link' ? 'underline' : undefined,
      fontSize: fontSize.md,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPressIn={() => setActive(true)}
        onPressOut={() => setActive(false)}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};
