import { Link, Redirect, router } from "expo-router";
import { Image, Text, View } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import { UserProvider, useUserContext } from "./contexts/userContext";

export default function Index() {
  const { isAuthenticated, user } = useUserContext();
  
  if (user) {
    return <Redirect href={"/(tabs)/home"}/>
  }

  return (
    <Onboarding
      onDone={() => { router.push("/(auth)/sign-in") }}
      onSkip={() => { router.push("/(auth)/sign-in") }}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/loginImg.png')} />,
          title: 'Onboarding',
          subtitle: 'test subtitle'
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/loginImg.png')} />,
          title: 'Onboarding 2',
          subtitle: 'test subtitle 2'
        }
      ]}
    />
  );
}
