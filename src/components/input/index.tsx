import React, { forwardRef } from 'react';
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

export const Input = forwardRef<TextInput, TextInputProps>((props, ref) => {
  return (
    <TextInput
      onChangeText={props.onChange as ((text: string) => void) | undefined}
      style={styles.input}
      placeholderTextColor={colors.secondary[400]}
      ref={ref}
      {...props}
    />
  );
});
