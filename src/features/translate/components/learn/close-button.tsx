/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Pressable, StyleSheet, Animated } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/solid';

interface CloseButtonProps {
  isVisible: boolean;
  onClose: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  isVisible,
  onClose,
}) => {
  const translate = React.useRef(new Animated.Value(-30)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  const moveInAnimation = React.useMemo(
    () =>
      Animated.timing(translate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    [translate],
  );

  const moveOutAnimation = React.useMemo(
    () =>
      Animated.timing(translate, {
        toValue: -30,
        duration: 500,
        useNativeDriver: true,
      }),
    [translate],
  );

  const fadeInAnimation = React.useMemo(
    () =>
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    [opacity],
  );

  const fadeOutAnimation = React.useMemo(
    () =>
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    [opacity],
  );

  React.useEffect(() => {
    moveInAnimation.reset();
    moveOutAnimation.reset();
    fadeInAnimation.reset();
    fadeOutAnimation.reset();
    if (isVisible) {
      moveInAnimation.start();
      fadeInAnimation.start();
    } else {
      moveOutAnimation.start();
      fadeOutAnimation.start();
    }
  }, [isVisible]);

  return (
    <Animated.View style={{ transform: [{ translateY: translate }], opacity }}>
      <Pressable style={styles.closeIcon} onPress={onClose}>
        <XMarkIcon color="#ffffff" size={30} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 22,
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
