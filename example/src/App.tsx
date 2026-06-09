import * as React from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CommandBar } from '@commandbar/react-native';

/**
 * Replace with your Amplitude **Guides & Surveys** project API key (same key as the web snippet).
 * Leave blank to see the inline "API key not set" toast.
 */
const AMPLITUDE_API_KEY = '';

const commandbarOptions = {
  apiKey: AMPLITUDE_API_KEY,
  spinnerColor: '#7B64C3',
};

const AMPLITUDE_LOGO_URL =
  'https://www.freelogovectors.net/wp-content/uploads/2023/11/amplitude_logo-freelogovectors.net_.png';

export default function App() {
  React.useEffect(() => {
    if (AMPLITUDE_API_KEY) {
      CommandBar.boot(commandbarOptions);
    }
  }, []);

  return (
    <View style={styles.root}>
      <AnimatedGradientBackground />

      <View style={styles.content}>
        <LogoImage />
        <Text style={styles.title}>Welcome to Amplitude!</Text>
        <View style={styles.buttonStack}>
          <CustomButton
            title="Open Resource Center"
            onPress={() => CommandBar.openResourceCenter()}
          />
          <CustomButton
            title="Open Assistant"
            onPress={() => CommandBar.openAssistant()}
          />
        </View>
      </View>

      {!AMPLITUDE_API_KEY ? (
        <View style={styles.toastContainer}>
          <Toast message="Set AMPLITUDE_API_KEY in App.tsx (Amplitude API key)." />
        </View>
      ) : null}
    </View>
  );
}

/**
 * Rotating purple → deep-blue linear gradient. Mirrors the iOS example's `GradientView`
 * by interpolating the gradient start/end offsets over an 8s loop.
 */
function AnimatedGradientBackground() {
  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [progress]);

  const startX = progress.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 1, 1, 0, 0],
  });
  const startY = progress.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 0, 1, 1, 0],
  });
  const endX = Animated.subtract(1, startX);
  const endY = Animated.subtract(1, startY);

  return (
    <AnimatedLinearGradient
      colors={['#7A3FE0', '#142168']}
      start={{ x: startX, y: startY }}
      end={{ x: endX, y: endY }}
      style={StyleSheet.absoluteFill}
    />
  );
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

function LogoImage() {
  return (
    <View style={styles.logo}>
      {/* White disc sitting behind the logo so the transparent area inside
          the "A" reads as white instead of letting the gradient show through. */}
      <View style={styles.logoBackdrop} />
      <Image
        source={{ uri: AMPLITUDE_LOGO_URL }}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
}

function CustomButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{`⚠  ${message}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1a1138' },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
  },
  logoBackdrop: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 46,
    backgroundColor: 'white',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  title: {
    marginTop: 20,
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonStack: {
    marginTop: 48,
    width: '100%',
    gap: 12,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  toastContainer: {
    position: 'absolute',
    top: 56,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  toast: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  toastText: {
    color: 'white',
    fontSize: 14,
  },
});
