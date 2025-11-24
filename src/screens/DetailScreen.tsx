import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, Text, View, Image} from 'react-native';
import {Header} from '../components/Header/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {Spacer} from '../components/Spacer';
import {SingleLineInput} from '../components/SingleLineInput';
import {convertToDateString} from '../utils/DateUtils';
import {MultiLineInput} from '../components/MultiLineInput';
import {RemoteImage} from '../components/RemoteImage';
import {AccountBookHistory} from '../data/AccountBookHistory';

export const DetailScreen: React.FC = () => {
  const navigation = useRootNavigation();
  const routes = useRootRoute<'Detail'>();
  const [item, setItem] = useState<AccountBookHistory>(routes.params.item);

  const onPressUpdate = useCallback(() => {
    navigation.push('Update', {
      item: routes.params.item,
      onChangeData: nextItem => {
        setItem(nextItem);
      },
    });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail SCREEN"></Header.Title>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesomeIcon icon={faClose} size={20} />
        </Pressable>
      </Header>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 12, paddingHorizontal: 24}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: item.type === '사용' ? 'black' : 'white',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              }}>
              <Text
                style={[
                  item.type === '사용' ? {color: 'white'} : {color: 'black'},
                  {fontSize: 16},
                ]}>
                사용
              </Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: item.type === '수입' ? 'black' : 'white',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
              }}>
              <Text
                style={[
                  item.type === '수입' ? {color: 'white'} : {color: 'black'},
                  {fontSize: 20},
                ]}>
                수입
              </Text>
            </View>
          </View>
        </View>

        <Spacer space={20} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}>
              <Text
                style={[
                  item.date === 0 ? {color: 'lightgray'} : {color: 'gray'},
                  {fontSize: 16},
                ]}>
                {item.price.toString() + '원'}
              </Text>
            </View>

            <Spacer space={24} />

            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}>
              <Text
                style={[
                  item.date === 0 ? {color: 'lightgray'} : {color: 'gray'},
                  {fontSize: 16},
                ]}>
                {convertToDateString(item.date)}{' '}
              </Text>
            </View>
          </View>

          <View style={{marginLeft: 24}}>
            {item.photoUrl ? (
              <Image
                source={{uri: item?.photoUrl}}
                width={100}
                height={100}
                style={{
                  borderRadius: 12,
                }}
              />
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  backgroundColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            )}
          </View>
        </View>

        <Spacer space={12} />
        <View
          style={{
            alignSelf: 'stretch',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'gray',
            height: 100,
          }}>
          <Text style={{fontSize: 20, color: 'gray'}}>{item.comment} </Text>
        </View>

        <Spacer space={64} />

        <Pressable onPress={onPressUpdate}>
          <View
            style={{
              paddingVertical: 12,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>수정하기</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};
