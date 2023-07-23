import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { spacing, colors, fontSize, border } from '@translate-us/styles';

interface ButtonProps {
  title: string;
  type?: 'primary' | 'default' | 'link';
  block?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = 'primary',
  block = false,
  disabled = false,
  onPress,
}) => {
  const [isActive, setActive] = React.useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {
      display: !block ? 'flex' : undefined,
      flexDirection: !block ? 'row' : undefined,
      width: block ? '100%' : undefined,
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
      opacity: disabled ? 0.7 : 1,
    },
    text: {
      color: type === 'primary' ? 'white' : colors.secondary[800],
      textDecorationLine: type === 'link' ? 'underline' : undefined,
      fontSize: fontSize.md,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPressIn={() => !disabled && setActive(true)}
        onPressOut={() => !disabled && setActive(false)}
        onPress={!disabled ? onPress : undefined}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};
