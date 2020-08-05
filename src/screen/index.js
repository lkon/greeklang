import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import request from '../services/request';
import {reducer} from '../state/reducer';
import removeAccent from '../utils/remove-accents';

const IndexScreen = ({words, key}) => {
  const [data, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback((word) => {
    const getTranslate = async (word) => {
      const wordWithOutAccent = removeAccent(word);
      const response = await request(word);
      const data = response.map((item) => {
        const textWithOutAccent = removeAccent(item?.text);
        if (textWithOutAccent.includes(wordWithOutAccent)) {
          return item?.text;
        }
        return null;
      });
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
        let index = 0;
        while (index <= words.length) {
          const word = words[index];

          let data = await retrieveData(word);
          console.log(data);

          if (!data) {
            data = await fetch(word);
            console.log(data);
          }
          dispatch({
            type: 'DATA',
            payload: {data},
          });
          await storeData(data);
          index++;
        }

        setLoading(false);
      })();
    }
  }, [fetch, loading, words]);

  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem(`@GreekLang:${data}`, JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  };
  const retrieveData = async (data) => {
    try {
      const value = await AsyncStorage.getItem(`@GreekLang:${data}`);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const renderItem = ({item}) => {
    if (item) {
      return (
        <Text style={{paddingVertical: 10, paddingHorizontal: 15}}>{item}</Text>
      );
    }
    return null;
  };

  if (!data.length) {
    return null;
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toLocaleString()}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: '#ccc'}} />
        )}
      />
    </SafeAreaView>
  );
};

export default IndexScreen;
