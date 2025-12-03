import React from 'react';
import {Pressable, View} from 'react-native';
import {Header} from '../components/Header/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faX} from '@fortawesome/free-solid-svg-icons';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {Calendar} from 'react-native-calendars';
import {convertToDateString} from '../utils/DateUtils';

const today = new Date();
today.setHours(0);
today.setMinutes(0);

export const CalendarSelectScreen: React.FC = () => {
  const navigation = useRootNavigation<'CalendarSelect'>();
  const routes = useRootRoute<'CalendarSelect'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="날짜 선택" />
        <Pressable onPress={navigation.goBack}>
          <FontAwesomeIcon icon={faX} />
        </Pressable>
      </Header>
      <Calendar
        onDayPress={(day: any) => {
          routes.params.onSelectDay(day.timestamp);
          navigation.goBack();
        }}
        maxDate={convertToDateString(today.getTime())}></Calendar>
    </View>
  );
};
