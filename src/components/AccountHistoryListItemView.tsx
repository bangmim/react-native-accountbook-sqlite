import React from 'react';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {Image, Pressable, Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleMinus, faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {Spacer} from './Spacer';
import {convertToDateString} from '../utils/DateUtils';

export const AccountBookHistoryListItemView: React.FC<{
  item: AccountBookHistory;
  onPressItem: (item: AccountBookHistory) => void;
}> = props => {
  const IconStyle = props.item.type === '사용' ? faCircleMinus : faCirclePlus;
  const IconColor = props.item.type === '사용' ? 'red' : 'blue';
  return (
    <Pressable onPress={() => props.onPressItem(props.item)}>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon icon={IconStyle} size={24} color={IconColor} />
        <View style={{flex: 1, marginLeft: 12}}>
          <Text style={{fontSize: 16}}>{props.item.price.toString()} </Text>
          <Text style={{fontSize: 16}}>{props.item.comment}</Text>
          <Spacer space={4} />
          <Text style={{fontSize: 12}}>
            {convertToDateString(
              props.item.date !== 0 ? props.item.date : props.item.createdAt,
            )}{' '}
          </Text>
        </View>
        {props.item.photoUrl !== null && (
          <Image
            source={{uri: props.item.photoUrl}}
            width={100}
            height={100}
            style={{borderRadius: 10}}
          />
        )}
      </View>
    </Pressable>
  );
};
