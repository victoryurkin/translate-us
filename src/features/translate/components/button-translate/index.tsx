import React, { useCallback } from 'react';
import { MicrophoneIcon } from 'react-native-heroicons/solid';
import {
  Animated,
  View,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import { colors } from '@translate-us/styles';

interface ButtonTranslateProps {
  onStartUpRecording?: () => void;
  onStartDownRecording?: () => void;
  onStopRecording?: () => void;
  isLoading?: boolean;
}

enum AnimationDirection {
  UP = 'up',
  DOWN = 'down',
}

export const ButtonTranslate: React.FC<ButtonTranslateProps> = ({
  onStartUpRecording,
  onStartDownRecording,
  onStopRecording,
  isLoading = false,
}) => {
  const [isActive, setActive] = React.useState(false);
  const [isAnimating, setAnimating] = React.useState<AnimationDirection>();
  const moveAnimation = React.useRef(new Animated.Value(0)).current;
  const initPositionRef = React.useRef<number>();

  const animationUp = React.useMemo(
    () =>
      Animated.timing(moveAnimation, {
        toValue: -40,
        duration: 200,
        useNativeDriver: true,
      }),
    [moveAnimation],
  );

  const animationDown = React.useMemo(
    () =>
      Animated.timing(moveAnimation, {
        toValue: 40,
        duration: 200,
        useNativeDriver: true,
      }),
    [moveAnimation],
  );

  const handleTouchMove = useCallback(
    (e: GestureResponderEvent) => {
      if (initPositionRef.current && !isLoading) {
        if (initPositionRef.current - e.nativeEvent.pageY > 0) {
          setAnimating(AnimationDirection.UP);
        } else {
          setAnimating(AnimationDirection.DOWN);
        }
      }
    },
    [isLoading],
  );

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      if (!isLoading) {
        initPositionRef.current = e.nativeEvent.pageY;
        setActive(true);
      }
    },
    [isLoading],
  );

  const handlePressOut = useCallback(() => {
    if (!isLoading) {
      setActive(false);
      setAnimating(undefined);
    }
  }, [isLoading]);

  React.useEffect(() => {
    if (isAnimating === AnimationDirection.UP) {
      animationDown.reset();
      animationUp.start();
      onStartUpRecording && onStartUpRecording();
    }
    if (isAnimating === AnimationDirection.DOWN) {
      animationUp.reset();
      animationDown.start();
      onStartDownRecording && onStartDownRecording();
    }
    if (!isAnimating) {
      animationUp.reset();
      animationDown.reset();
      onStopRecording && onStopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating]);

  const buttonStyles = StyleSheet.create({
    button: {
      width: 100,
      height: 100,
      backgroundColor: isActive ? colors.primary[800] : colors.primary[600],
      borderRadius: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isLoading ? 0.75 : 1,
    },
    animation: {
      transform: [{ translateY: moveAnimation }],
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Animated.View style={buttonStyles.animation}>
          <Pressable
            style={buttonStyles.button}
            onTouchMove={handleTouchMove}
            onTouchStart={handlePressIn}
            onTouchEnd={handlePressOut}>
            <MicrophoneIcon color="white" width={50} height={50} />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 102,
    height: 180,
    borderRadius: 100,
    borderColor: colors.secondary[300],
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: colors.secondary[200],
  },
});
