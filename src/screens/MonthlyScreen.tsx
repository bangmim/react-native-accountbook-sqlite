import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {Header} from '../components/Header/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {StackedBarChart} from 'react-native-chart-kit';
import {useRootNavigation} from '../navigations/RootNavigation';
import {useAccountBookHistoryItem} from '../hooks/useAccountBookHistoryItem';
import {AccountBookHistory} from '../data/AccountBookHistory';

export const MonthlyScreen: React.FC = () => {
  const navigation = useRootNavigation();
  const {width} = useWindowDimensions();
  const {getList} = useAccountBookHistoryItem();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[][];
  }>({labels: [], data: []});

  const buildMonthlyData = useCallback((items: AccountBookHistory[]) => {
    const now = new Date();

    // 최근 3개월 (현재월 포함, 과거 -> 현재 순)
    const months: {key: string; label: string}[] = [];
    for (let i = 2; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`; // year-monthIndex
      const label = `${d.getMonth() + 1}월`;
      months.push({key, label});
    }

    const summary = new Map<
      string,
      {
        expense: number;
        income: number;
      }
    >();

    months.forEach(m => {
      summary.set(m.key, {expense: 0, income: 0});
    });

    items.forEach(item => {
      // 날짜가 없으면 createdAt 기준으로 처리
      const time = item.date !== 0 ? item.date : item.createdAt;
      if (!time) {
        return;
      }
      const d = new Date(time);
      const key = `${d.getFullYear()}-${d.getMonth()}`;

      if (!summary.has(key)) {
        return;
      }

      const current = summary.get(key)!;
      if (item.type === '사용') {
        current.expense += item.price;
      } else {
        current.income += item.price;
      }
    });

    const labels = months.map(m => m.label);
    // 차트에는 금액을 1,000으로 나눈 값(단위: 천원)을 사용
    const data = months.map(m => {
      const s = summary.get(m.key)!;
      return [s.expense / 1000, s.income / 1000];
    });

    setChartData({labels, data});
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const list = await getList();
      buildMonthlyData(list);
      setLoading(false);
    };

    fetch();
  }, [buildMonthlyData, getList]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MonthlyScreen (단위: 천원)"></Header.Title>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesomeIcon icon={faClose} />
        </Pressable>
      </Header>
      <View style={{flex: 1, padding: 16}}>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator />
          </View>
        ) : chartData.labels.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>표시할 데이터가 없습니다.</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}>
            <StackedBarChart
              data={{
                labels: chartData.labels,
                legend: ['사용', '수입'],
                data: chartData.data,
                barColors: ['#ff6b6b', '#4ecdc4'],
              }}
              width={Math.max(width - 32, chartData.labels.length * 80)}
              height={260}
              hideLegend={false}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#f1f2f6',
                backgroundGradientTo: '#dfe4ea',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                barPercentage: 0.5,
                decimalPlaces: 0,
              }}
              style={{
                borderRadius: 12,
              }}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};
