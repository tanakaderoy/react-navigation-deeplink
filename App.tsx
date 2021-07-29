import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  LinkingOptions,
  NavigationContainer,
  useLinkTo,
} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const config = {
  screens: {
    BaseStack: {
      path: 'base',
      initialRouteName: 'Home',
      screens: {
        Home: 'home',
        Profile: {
          path: 'user/:name/:id/',
          parse: {
            name: (name: string) => `${name}`,
            id: (id: any) => `${id}`,
          },
        },
      },
    },
    Settings: 'settings',
  },
};

// const config = {
//   screens: {
//     Home: {
//       path: 'home',
//       screens: {
//         Profile: {
//           path: 'profile/:id',
//           parse: {
//             id: (id: string) => `${id}`,
//           },
//           Settings: 'settings',
//         },
//       },
//     },

//     Notifications: 'notifications',
//   },
// };

const linking: LinkingOptions = {
  prefixes: ['demo://app', 'https://app.hudl.com'],
  config,
};

type RootStackParamList = {
  Home: undefined;
  Profile: {id: string; name: string};
};

type TabParamList = {
  BaseStack: undefined;
  Settings: undefined;
};

function HomeScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'Home'>) {
  const linkTo = useLinkTo();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Tanaka's Profile"
        onPress={() => linkTo('/base/user/tanaka/22')}
      />
    </View>
  );
}
function ProfileScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'Profile'>) {
  const {id} = route.params ?? 0;
  const {name} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
      <Text>Hello {name}</Text>
      <Text>ID is {id}</Text>
      <Button title="Go to Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen({
  navigation,
}: StackScreenProps<TabParamList, 'Settings'>) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
      <Button title="Go to Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<TabParamList>();

const BaseStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator>
        <Tab.Screen name="BaseStack" component={BaseStack} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
