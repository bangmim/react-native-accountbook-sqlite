import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {MainScreen} from '../screens/MainScreen';
import {AddUpdateScreen} from '../screens/AddUpdateScreen';
import {MonthlyScreen} from '../screens/MonthlyScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CalendarSelectScreen} from '../screens/CalendarSelectScreen';
import {TakePhotoScreen} from '../screens/TakePhotoScreen';
import {SelectPhotoScreen} from '../screens/SelectPhotoScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {useAuth} from '../hooks/useAuth';

type ScreenParams = {
  // 받을 data 형태
  Login: undefined;
  Add: {selectedDate?: number};
  Main: undefined;
  Update: {
    item: AccountBookHistory;
    onChangeData: (nextItem: AccountBookHistory) => void;
    selectedDate?: number;
  };
  Detail: {item: AccountBookHistory};
  MonthlyAverage: undefined;
  CalendarSelect: {selectedDate?: number};
  TakePhoto: {onTakePhoto: (url: string) => void};
  SelectPhoto: {onSelectPhoto: (url: string) => void};
};

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  const {isAuthenticated, loading} = useAuth();

  if (loading) {
    // 로딩 중일 때는 아무것도 표시하지 않거나 로딩 화면 표시
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'containedModal'}}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Add" component={AddUpdateScreen} />
          <Stack.Screen name="Update" component={AddUpdateScreen} />
          <Stack.Screen name="MonthlyAverage" component={MonthlyScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen
            name="CalendarSelect"
            component={CalendarSelectScreen}
            options={{presentation: 'transparentModal', animation: 'fade'}}
          />
          <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
          <Stack.Screen name="SelectPhoto" component={SelectPhotoScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

// RouteName을 받아올건데, ScreenParams에 있는 키 값 중에 있는 것으로만 넣을 수 있다
export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();
