/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Animated, ScrollView, StyleSheet, Dimensions } from 'react-native';

const screenDimensions = Dimensions.get('screen');

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateAnim = React.useRef(
    new Animated.Value(screenDimensions.height - 80),
  ).current;

  const animationUp = React.useMemo(
    () =>
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    [translateAnim],
  );

  const animationDown = React.useMemo(
    () =>
      Animated.timing(translateAnim, {
        toValue: screenDimensions.height - 80,
        duration: 300,
        useNativeDriver: true,
      }),
    [translateAnim],
  );

  const animationFadeIn = React.useMemo(
    () =>
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: true,
      }),
    [fadeAnim],
  );

  const animationFadeOut = React.useMemo(
    () =>
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    [fadeAnim],
  );

  useEffect(() => {
    if (isOpen) {
      animationUp.start();
      animationFadeIn.start();
    } else {
      animationDown.start();
      animationFadeOut.start();
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      {isOpen && (
        <React.Fragment>
          <Animated.View style={[styles.background, { opacity: fadeAnim }]} />
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{ translateY: translateAnim }],
              },
            ]}>
            <ScrollView style={styles.content}>{children}</ScrollView>
          </Animated.View>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.7,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: screenDimensions.height - 80,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
});
