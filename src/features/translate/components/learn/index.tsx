/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  NativeModules,
} from 'react-native';
import { colors, spacing } from '@translate-us/styles';
import { Pointer } from './pointer';
import { CloseButton } from './close-button';

const screenDimensions = Dimensions.get('screen');
const statusBarHeight = NativeModules?.StatusBarManager?.HEIGHT
  ? NativeModules?.StatusBarManager?.HEIGHT
  : 60;

interface LearnProps {
  isPlaying: boolean;
  onStop: () => void;
}

export const Learn: React.FC<LearnProps> = ({ isPlaying }) => {
  const [isOpen, toggleLearn] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const topBarAnimationRef = React.useRef(
    new Animated.Value(-screenDimensions.height),
  ).current;
  const bottomBarAnimationRef = React.useRef(
    new Animated.Value(screenDimensions.height),
  ).current;
  const pointerMoveAnimationRef = React.useRef(new Animated.Value(50)).current;
  const pointerOpacityAnimationRef = React.useRef(
    new Animated.Value(0),
  ).current;

  const topBarAnimation = React.useMemo(
    () =>
      Animated.timing(topBarAnimationRef, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    [topBarAnimationRef],
  );

  const bottomBarAnimation = React.useMemo(
    () =>
      Animated.timing(bottomBarAnimationRef, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    [bottomBarAnimationRef],
  );

  const pointerMoveAnimation = React.useMemo(
    () =>
      Animated.timing(pointerMoveAnimationRef, {
        toValue: -30,
        duration: 500,
        useNativeDriver: true,
      }),
    [pointerMoveAnimationRef],
  );

  const pointerFadeInAnimation = React.useMemo(
    () =>
      Animated.timing(pointerOpacityAnimationRef, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    [pointerOpacityAnimationRef],
  );

  const pointerFadeOutAnimation = React.useMemo(
    () =>
      Animated.timing(pointerOpacityAnimationRef, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    [pointerOpacityAnimationRef],
  );

  React.useEffect(() => {
    const play = () => {
      setTimeout(() => {
        toggleLearn(true);
      }, 800);

      topBarAnimation.reset();
      setTimeout(() => {
        topBarAnimation.start();
      }, 800);

      bottomBarAnimation.reset();
      setTimeout(() => {
        bottomBarAnimation.start();
      }, 800);

      pointerFadeInAnimation.reset();
      pointerFadeOutAnimation.reset();
      setTimeout(() => {
        pointerFadeInAnimation.start();
      }, 1200);

      setIsPressed(false);
      setTimeout(() => {
        setIsPressed(true);
      }, 2000);

      setTimeout(() => {
        setIsPressed(false);
      }, 5000);

      setTimeout(() => {
        pointerFadeOutAnimation.start();
      }, 7000);

      pointerMoveAnimation.reset();
      setTimeout(() => {
        pointerMoveAnimation.start();
      }, 2600);
    };
    if (isPlaying) {
      play();
    }
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Animated.View
          style={{
            ...styles.topBarBackground,
            transform: [{ translateY: topBarAnimationRef }],
          }}
        />
        <View style={styles.topBarContent}>
          <CloseButton isVisible={isOpen} onClose={() => toggleLearn(false)} />
        </View>
      </View>
      <View style={styles.pointerBar}>
        <Animated.View
          style={{
            ...styles.pointer,
            opacity: pointerOpacityAnimationRef,
            transform: [
              { translateY: pointerMoveAnimationRef },
              { translateX: 110 },
            ],
          }}>
          <Pointer
            width={88}
            height={69}
            fill={colors.secondary[600]}
            isPressed={isPressed}
          />
        </Animated.View>
      </View>
      <View style={styles.bottomBar}>
        <Animated.View
          style={{
            ...styles.bottomBarBackground,
            transform: [{ translateY: bottomBarAnimationRef }],
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    flex: 1,
    overflow: 'hidden',
  },
  topBarContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: statusBarHeight,
    paddingRight: spacing['2xl'],
  },
  topBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenDimensions.width,
    height: screenDimensions.height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentBar: {},
  bottomBar: {
    flex: 1,
    overflow: 'hidden',
  },
  bottomBarBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenDimensions.width,
    height: screenDimensions.height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pointerBar: {
    height: 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointer: {
    position: 'absolute',
  },
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
