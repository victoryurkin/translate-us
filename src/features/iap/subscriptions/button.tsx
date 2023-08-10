import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { colors, fontSize, spacing } from '@translate-us/styles';

interface ButtonProps {
  icon: ImageSourcePropType;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => {
  const [isPressed, setPressed] = React.useState(false);
  return (
    <Pressable
      style={[
        styles.button,
        isPressed ? styles.buttonPressed : styles.buttonShadow,
      ]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.buttonSubheader}>{subtitle}</Text>
      <View style={styles.buttonFooter}>
        <Text style={styles.buttonHeader}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: spacing.lg,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  buttonPressed: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    transform: [
      {
        translateY: 5,
      },
    ],
  },
  buttonFooter: {
    backgroundColor: colors.primary[500],
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonHeader: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  buttonSubheader: {
    width: '100%',
    paddingVertical: spacing.xs,
    fontSize: fontSize.md,
    color: colors.secondary[500],
    textAlign: 'center',
    backgroundColor: colors.secondary[200],
  },
  icon: {
    marginVertical: spacing.md,
    width: 50,
    height: 50,
  },
});
