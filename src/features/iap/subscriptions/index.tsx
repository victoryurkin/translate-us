import React from 'react';
import { Animated, ScrollView, StyleSheet, Text } from 'react-native';
import { initConnection, getProducts, endConnection } from 'react-native-iap';

export const Subscriptions: React.FC = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateAnim = React.useRef(new Animated.Value(0)).current;

  const animationUp = React.useMemo(
    () =>
      Animated.timing(translateAnim, {
        toValue: -40,
        duration: 200,
        useNativeDriver: true,
      }),
    [translateAnim],
  );

  const animationDown = React.useMemo(
    () =>
      Animated.timing(translateAnim, {
        toValue: 40,
        duration: 200,
        useNativeDriver: true,
      }),
    [translateAnim],
  );

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        await initConnection();
        const products = getProducts({
          skus: ['subMonthly', 'subYearly'],
        });
        console.log('!!!!', products);
      } catch (error) {
        console.log('Error loading IAP: ', error);
      }
    };

    loadProducts();

    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    return () => {
      endConnection();
    };
  }, [fadeAnim, translateAnim]);

  const animationStyles = StyleSheet.create({
    modal: {
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '90%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      transform: [{ translateY: translateAnim }],
    },
  });

  return (
    <React.Fragment>
      <Animated.View
        style={{
          ...styles.background,
          opacity: fadeAnim,
        }}
      />
      <Animated.ScrollView style={animationStyles.modal}>
        <Text>1123</Text>
      </Animated.ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  modal: {},
});
