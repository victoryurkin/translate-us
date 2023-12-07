import React from 'react';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { colors, fontSize, spacing } from '@translate-us/styles';

interface IconProps {
  color?: string;
  size?: number;
  height?: number;
  style?: any;
}

export interface ListMenuProps {
  sectionTitle?: string;
  icon: React.FC<IconProps>;
  title: string;
  onPress: () => void;
}

export const ListMenu: React.FC<ListMenuProps> = ({
  sectionTitle,
  icon,
  title,
  onPress,
}) => {
  const [isPressed, setPressed] = React.useState(false);

  const Icon = icon;
  return (
    <View style={styles.container}>
      {sectionTitle && <Text style={styles.sectionTitle}>{sectionTitle}</Text>}
      <View
        style={{
          ...styles.buttonBg,
          backgroundColor: isPressed
            ? colors.secondary[700]
            : colors.secondary[800],
        }}
      />
      <Pressable
        style={styles.button}
        onPress={onPress}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}>
        <Icon style={styles.icon} color={colors.secondary[200]} height={30} />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <ChevronRightIcon color={colors.secondary[400]} size={20} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.secondary[700],
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonBg: {
    position: 'absolute',
    width: 500,
    height: 42,
    marginTop: 28,
    marginLeft: -20,
    opacity: 0.3,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    color: colors.secondary[400],
    marginBottom: spacing.xs,
  },
  icon: {
    marginRight: spacing.md,
    color: colors.secondary[300],
  },
  title: {
    fontSize: fontSize.md,
    color: colors.secondary[200],
    overflow: 'hidden',
    flex: 1,
  },
});
