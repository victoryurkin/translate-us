import { colors } from '@translate-us/styles';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Bars3Icon } from 'react-native-heroicons/solid';
import { Settings } from '@translate-us/features';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, toggleDrawer] = React.useState(false);

  return (
    <Drawer
      open={isOpen}
      onOpen={() => toggleDrawer(true)}
      onClose={() => toggleDrawer(false)}
      drawerPosition="right"
      renderDrawerContent={() => {
        return <Settings onClose={() => toggleDrawer(false)} />;
      }}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Pressable onPress={() => toggleDrawer(!isOpen)} style={styles.menu}>
            <Bars3Icon color="white" size={35} />
          </Pressable>
          {children}
        </View>
      </SafeAreaView>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  safeArea: {
    backgroundColor: colors.primary[600],
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 100,
    padding: 5,
  },
});
