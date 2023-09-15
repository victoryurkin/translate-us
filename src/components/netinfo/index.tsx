/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { StyleSheet, Text, NativeModules, Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { colors } from '@translate-us/styles';
import { useTranslation } from '@translate-us/i18n';
import { WifiIcon } from 'react-native-heroicons/solid';

const height =
  (NativeModules?.StatusBarManager?.HEIGHT
    ? NativeModules?.StatusBarManager?.HEIGHT
    : 60) + 50;

const WAIT_TIME = 1000;

export const Netinfo = () => {
  const { t } = useTranslation();
  const [fadeAnim] = React.useState(new Animated.Value(1));
  const [moveAnim] = React.useState(new Animated.Value(-height));
  const [isVisible, setVisible] = React.useState(false);
  const [isConnected, setConnected] = React.useState(true);
  const isConnectedRef = React.useRef(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(!!state.isConnected);
      isConnectedRef.current = !!state.isConnected;
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const show = React.useMemo(
    () =>
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    [],
  );

  const hide = React.useMemo(
    () =>
      Animated.timing(moveAnim, {
        toValue: -height,
        duration: 300,
        useNativeDriver: true,
      }),
    [],
  );

  React.useEffect(() => {
    if (isVisible) {
      show.start();
    } else {
      hide.start();
    }
  }, [isVisible]);

  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      if (isConnectedRef.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }, WAIT_TIME);
  }, [isConnected]);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: moveAnim }] }]}>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}>
        <WifiIcon color="#710000" size={30} />
      </Animated.View>
      <Text style={styles.status}>{t('offline')}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: colors.secondary[200],
    opacity: 0.8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
  },
  status: {
    color: colors.secondary[700],
    marginBottom: 8,
  },
});
