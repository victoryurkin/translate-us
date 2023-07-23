import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors, spacing, border, fontSize } from '@translate-us/styles';

const styles = StyleSheet.create({
  input: {
    borderWidth: border.width,
    borderColor: colors.secondary[400],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: border.radius,
    fontSize: fontSize.md,
  },
});

export const Input: React.FC<TextInputProps> = props => {
  return <TextInput style={styles.input} {...props} />;
};
