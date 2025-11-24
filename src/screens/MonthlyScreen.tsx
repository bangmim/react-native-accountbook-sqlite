import React from 'react';
import {Pressable, View} from 'react-native';
import {Header} from '../components/Header/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

export const MonthlyScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MonthlyScreen"></Header.Title>
        <Pressable onPress={() => {}}>
          <FontAwesomeIcon icon={faClose} />
        </Pressable>
      </Header>
    </View>
  );
};
