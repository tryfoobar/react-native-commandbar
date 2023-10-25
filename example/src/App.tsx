import * as React from 'react';

import { Button, StyleSheet, View, NativeModules } from 'react-native';
import { CommandBar } from 'react-native-commandbar';

export default function App() {
  const handleOpenHelpHub = async () => {
    console.log(NativeModules);
    await CommandBar.openHelpHub();
  };
  return (
    <View style={styles.container}>
      <Button title="Open HelpHub" onPress={handleOpenHelpHub} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
