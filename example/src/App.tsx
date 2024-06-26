import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { CommandBar } from '@commandbar/react-native';

const commandbarOptions = { orgId: 'your_org_id', spinnerColor: '#7B64C3' };

export default function App() {
  const handleOpenHelpHub = () => {
    CommandBar.openHelpHub(commandbarOptions);
  };

  return (
    <View style={styles.container}>
      <Button title="Open HelpHub" onPress={handleOpenHelpHub} />

      {/* Uncomment the following code to render the HelpHubView component inline */}
      {/* <CommandBar.HelpHubView
        options={commandbarOptions}
        onFallbackAction={handleFallbackAction}
        style={styles.helphub}
      /> */}
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
