import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Home from './Screens/Home';
import ForgetPassword from './Screens/ForgetPassword';
import OTP from './Screens/OTP';
import Signup from './Screens/SignUp';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {StatusBar, View} from 'react-native';
import Terms from './Screens/Terms';
import Privacy from './Screens/Privacy';
import Payment from './Screens/Payment';
import Disclaimer from './Screens/Disclaimer';
import ContactUs from './Screens/ContactUs';
import AboutUs from './Screens/AboutUs';
import EditProfile from './Screens/EditProfile';
import FAQs from './Screens/FAQs';
import ChangePassword from './Screens/ChangePassword';
import {GRADIENT_1} from './Constants/Colors';
import TermsOfUse from './Screens/TermsOfUse';
import EmailNotification from './Screens/EmailNotification';
import Email from './Screens/Email';
import Templates from './Screens/Templates';
import AllTemplates from './Screens/AllTemplates';
import Projects from './Screens/Projects';
import DownloadHistory from './Screens/DownloadHistory';
import CustomizeTemplates from './Screens/CustomizeTemplates';


const CustomStatusBar = ({backgroundColor, barStyle = 'light-content'}) => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[GRADIENT_1, GRADIENT_1]}
      start={[1, 1]}
      end={[0, 0]}
      location={[0.25, 0.7, 1]}
      style={{
        height: insets.top,
      }}>
      <View style={{backgroundColor, height: insets.top}}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor={backgroundColor}
          barStyle={barStyle}
        />
      </View>
    </LinearGradient>
  );
};
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <CustomStatusBar backgroundColor="transparent" />
        <Stack.Navigator
          initialRouteName="AppSplashScreen"
          screenOptions={{
            headerShown: false,
            animation: 'none',
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="FAQs" component={FAQs} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="Disclaimer" component={Disclaimer} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
          <Stack.Screen name="Templates" component={Templates} />
          <Stack.Screen name="CustomizeTemplate" component={CustomizeTemplates} />
          <Stack.Screen name="AllTemplates" component={AllTemplates} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="EmailNotification" component={EmailNotification} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="Projects" component={Projects} />
          <Stack.Screen name="Download" component={DownloadHistory} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Router;
