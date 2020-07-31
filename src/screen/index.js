import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import request from '../services/request';
import {reducer} from '../state/reducer';

const IndexScreen = ({words, key}) => {
  const [data, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback((word) => {
    const getTranslate = async (word) => {
      const response = await request(word);
      const data = response.map((item) => item?.text);
      dispatch({
        type: 'DATA',
        payload: {data},
      });
      return data;
    };

    return getTranslate(word);
  }, []);

  useEffect(() => {
    if (loading) {
      (async () => {
        const data = await retrieveData();
        if (data) {
          dispatch({
            type: 'DATA',
            payload: {data},
          });
        } else {
          let index = 0;
          while (index <= words.length) {
            const data = await fetch(words[index]);
            index++;
          }
          // await storeData(data);
        }
        setLoading(false);
      })();
    }
  }, [loading, fetch]);

  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem(`@GreekLang:${key}`, JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(`@GreekLang:${key}`);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const renderItem = ({item}) => (
    <Text style={{paddingVertical: 10, paddingHorizontal: 15}}>{item}</Text>
  );

  if (!data.length) {
    return null;
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: '#ccc'}} />
        )}
      />
    </SafeAreaView>
  );
};

export default IndexScreen;
