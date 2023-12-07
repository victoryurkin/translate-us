/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  NativeModules,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing } from '@translate-us/styles';
import { Pointer } from './pointer';
import { CloseButton } from './close-button';
import { notifications, AppEvents } from '@translate-us/clients';
import { useTranslation } from '@translate-us/i18n';
import { ChevronUpIcon, ChevronDownIcon } from 'react-native-heroicons/outline';

const screenDimensions = Dimensions.get('screen');
const statusBarHeight = NativeModules?.StatusBarManager?.HEIGHT
  ? NativeModules?.StatusBarManager?.HEIGHT
  : 60;

export const Learn: React.FC = () => {
  const [isOpen, toggleLearn] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isLastInstruction, setIsLastInstruction] = React.useState(false);

  const { t } = useTranslation();

  const isOpenRef = React.useRef(isOpen);

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
  const topInstructionsRef = React.useRef(new Animated.Value(0)).current;
  const bottomInstructionsRef = React.useRef(new Animated.Value(0)).current;
  const topArrowFadeAnimationRef = React.useRef(new Animated.Value(0)).current;
  const topArrowMoveAnimationRef = React.useRef(new Animated.Value(0)).current;
  const bottomArrowMoveAnimationRef = React.useRef(
    new Animated.Value(0),
  ).current;
  const bottomArrowFadeAnimationRef = React.useRef(
    new Animated.Value(0),
  ).current;

  const topBarAnimationIn = React.useMemo(
    () =>
      Animated.timing(topBarAnimationRef, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    [topBarAnimationRef],
  );

  const topBarAnimationOut = React.useMemo(
    () =>
      Animated.timing(topBarAnimationRef, {
        toValue: -screenDimensions.height,
        duration: 800,
        useNativeDriver: true,
      }),
    [topBarAnimationRef],
  );

  const bottomBarAnimationIn = React.useMemo(
    () =>
      Animated.timing(bottomBarAnimationRef, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    [bottomBarAnimationRef],
  );

  const bottomBarAnimationOut = React.useMemo(
    () =>
      Animated.timing(bottomBarAnimationRef, {
        toValue: screenDimensions.height,
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

  const topInstructionsAnimationIn = React.useMemo(
    () =>
      Animated.timing(topInstructionsRef, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    [topInstructionsRef],
  );

  const topInstructionsAnimationOut = React.useMemo(
    () =>
      Animated.timing(topInstructionsRef, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    [topInstructionsRef],
  );

  const bottomInstructionsAnimationIn = React.useMemo(
    () =>
      Animated.timing(bottomInstructionsRef, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    [bottomInstructionsRef],
  );

  const bottomInstructionsAnimationOut = React.useMemo(
    () =>
      Animated.timing(bottomInstructionsRef, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    [bottomInstructionsRef],
  );

  const topArrowFadeInAnimation = React.useMemo(
    () =>
      Animated.timing(topArrowFadeAnimationRef, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    [topArrowFadeAnimationRef],
  );

  const topArrowFadeOutAnimation = React.useMemo(
    () =>
      Animated.timing(topArrowFadeAnimationRef, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    [topArrowFadeAnimationRef],
  );

  const topArrowMoveUpAnimation = React.useMemo(
    () =>
      Animated.timing(topArrowMoveAnimationRef, {
        toValue: -60,
        duration: 800,
        useNativeDriver: true,
      }),
    [topArrowMoveAnimationRef],
  );

  const bottomArrowFadeInAnimation = React.useMemo(
    () =>
      Animated.timing(bottomArrowFadeAnimationRef, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    [bottomArrowFadeAnimationRef],
  );

  const bottomArrowFadeOutAnimation = React.useMemo(
    () =>
      Animated.timing(bottomArrowFadeAnimationRef, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    [bottomArrowFadeAnimationRef],
  );

  const bottomArrowMoveDownAnimation = React.useMemo(
    () =>
      Animated.timing(bottomArrowMoveAnimationRef, {
        toValue: 60,
        duration: 800,
        useNativeDriver: true,
      }),
    [bottomArrowMoveAnimationRef],
  );

  React.useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const reset = () => {
    setIsLastInstruction(false);
    topBarAnimationIn.reset();
    bottomBarAnimationIn.reset();
    topInstructionsAnimationIn.reset();
    pointerFadeInAnimation.reset();
    pointerFadeOutAnimation.reset();
    pointerMoveAnimation.reset();
    topInstructionsAnimationOut.reset();
    bottomInstructionsAnimationIn.reset();
    bottomInstructionsAnimationOut.reset();
    topBarAnimationOut.reset();
    bottomBarAnimationOut.reset();
    topArrowFadeInAnimation.reset();
    topArrowFadeOutAnimation.reset();
    topArrowMoveUpAnimation.reset();
    bottomArrowFadeInAnimation.reset();
    bottomArrowFadeOutAnimation.reset();
    bottomArrowMoveDownAnimation.reset();
  };

  React.useEffect(() => {
    const play = () => {
      toggleLearn(true);

      reset();

      setTimeout(() => {
        isOpenRef.current && topBarAnimationIn.start();
      }, 300);

      setTimeout(() => {
        isOpenRef.current && bottomBarAnimationIn.start();
      }, 300);

      setTimeout(() => {
        isOpenRef.current && topInstructionsAnimationIn.start();
      }, 800);

      setTimeout(() => {
        isOpenRef.current && pointerFadeInAnimation.start();
      }, 1200);

      setIsPressed(false);
      setTimeout(() => {
        isOpenRef.current && setIsPressed(true);
      }, 2000);

      setTimeout(() => {
        isOpenRef.current && pointerMoveAnimation.start();
      }, 2600);

      setTimeout(() => {
        if (isOpenRef.current) {
          topInstructionsAnimationOut.start();
          bottomInstructionsAnimationIn.start();
        }
      }, 4200);

      setTimeout(() => {
        isOpenRef.current && setIsPressed(false);
      }, 5000);

      setTimeout(() => {
        isOpenRef.current && bottomInstructionsAnimationOut.start();
      }, 6500);

      setTimeout(() => {
        if (isOpenRef.current) {
          pointerFadeOutAnimation.start();
          setIsLastInstruction(true);
          topInstructionsAnimationIn.start();
        }
      }, 7000);

      setTimeout(() => {
        isOpenRef.current && topArrowFadeInAnimation.start();
        isOpenRef.current && topArrowMoveUpAnimation.start();
      }, 7500);

      setTimeout(() => {
        isOpenRef.current && topArrowFadeOutAnimation.start();
      }, 8000);

      setTimeout(() => {
        isOpenRef.current && bottomArrowFadeInAnimation.start();
        isOpenRef.current && bottomArrowMoveDownAnimation.start();
      }, 8500);

      setTimeout(() => {
        isOpenRef.current && bottomArrowFadeOutAnimation.start();
      }, 9000);

      setTimeout(() => {
        if (isOpenRef.current) {
          topBarAnimationOut.start();
          bottomBarAnimationOut.start();
          topInstructionsAnimationOut.start();
        }
      }, 11200);

      setTimeout(() => {
        isOpenRef.current && toggleLearn(false);
      }, 12000);
    };

    const playEventHandler = () => {
      play();
    };
    notifications.addListener(AppEvents.LEARN_PLAY, playEventHandler);
    return () => {
      notifications.removeListener(AppEvents.LEARN_PLAY, playEventHandler);
    };
  }, []);

  const close = () => {
    reset();
    toggleLearn(false);
  };

  React.useEffect(() => {
    const checkIfFirstTime = async () => {
      const isFirstTime = await AsyncStorage.getItem('learn.is_first_time');
      if (!isFirstTime || isFirstTime !== 'true') {
        AsyncStorage.setItem('learn.is_first_time', 'true');
        setTimeout(() => {
          notifications.emit(AppEvents.LEARN_PLAY);
        }, 2000);
      }
    };
    checkIfFirstTime();
  }, []);

  return (
    <>
      {isOpen && (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Animated.View
              style={{
                ...styles.topBarBackground,
                transform: [{ translateY: topBarAnimationRef }],
              }}
            />
            <View style={styles.topBarContent}>
              <View style={styles.topBarContentTextContainer}>
                <CloseButton isVisible={isOpen} onClose={close} />
                <View style={styles.topBarContentDivider} />
                <Animated.View
                  style={{
                    ...styles.topBarContentTextAnimatedView,
                    opacity: topInstructionsRef,
                  }}>
                  <Text style={styles.topBarContentText}>
                    {isLastInstruction
                      ? t('learn.instruction_03')
                      : t('learn.instruction_01')}
                  </Text>
                </Animated.View>
              </View>
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
            <Animated.View
              style={{
                ...styles.pointer,
                opacity: topArrowFadeAnimationRef,
                transform: [
                  { translateY: topArrowMoveAnimationRef },
                  { translateX: 100 },
                ],
              }}>
              <ChevronUpIcon
                width={60}
                height={60}
                color={colors.secondary[600]}
              />
            </Animated.View>
            <Animated.View
              style={{
                ...styles.pointer,
                opacity: bottomArrowFadeAnimationRef,
                transform: [
                  { translateY: bottomArrowMoveAnimationRef },
                  { translateX: 100 },
                ],
              }}>
              <ChevronDownIcon
                width={60}
                height={60}
                color={colors.secondary[600]}
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
            <Animated.View
              style={{
                ...styles.bottomBarContentTextContainer,
                opacity: bottomInstructionsRef,
              }}>
              <Text style={styles.bottomBarContentText}>
                {t('learn.instruction_02')}
              </Text>
            </Animated.View>
          </View>
        </View>
      )}
    </>
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
  },
  topBarContentTextAnimatedView: {
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  topBarContentText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
    marginBottom: spacing.mega,
  },
  topBarContentDivider: {
    flex: 1,
  },
  topBarContentTextContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  topBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenDimensions.width,
    height: screenDimensions.height,
    backgroundColor: 'rgba(0,0,0,0.65)',
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
    backgroundColor: 'rgba(0,0,0,0.65)',
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
  arrow: {
    transform: [{ translateX: 100 }],
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
  bottomBarContentText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: spacing.mega,
    marginHorizontal: spacing.lg,
    textAlign: 'center',
  },
  bottomBarContentTextContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
