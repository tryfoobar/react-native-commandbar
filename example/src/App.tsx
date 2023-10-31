import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { HelpHubView } from 'react-native-commandbar';

const commandbarOptions = { orgId: '641ade4d', launchCode: 'preview_4686' };

export default function App() {
  const handleFallbackAction = (action: any) => {
    console.log('onFallbackAction', action);
  };

  // const handleOpenHelpHub = () => {
  //   CommandBar.openHelpHub(commandbarOptions, handleFallbackAction);
  // };

  return (
    <View style={styles.container}>
      {/* <Button title="Open HelpHub" onPress={handleOpenHelpHub} /> */}
      <HelpHubView
        options={commandbarOptions}
        onFallbackAction={handleFallbackAction}
        style={styles.helphub}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  helphub: { width: '100%', height: '100%' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
