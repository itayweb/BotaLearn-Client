import { Link, router } from "expo-router";
import { Image, Text, View } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';

export default function Index() {
  return (
    <Onboarding
      onDone={() => { router.push("/(auth)/sign-in") }}
      onSkip={() => { router.push("/(auth)/sign-in") }}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/react-logo.png')} />,
          title: 'Onboarding',
          subtitle: 'test subtitle'
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/react-logo.png')} />,
          title: 'Onboarding 2',
          subtitle: 'test subtitle 2'
        }
      ]}
    />
  );
}
