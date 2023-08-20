import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { theme } from '../theme';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { debounce } from '../utils';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import { weatherImages } from '../constants';

export default function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);
  const [weather, setWeather] = useState({});

  const handleLocation = (loc) => {
    setLocations([]);
    setShowSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then((data) => setWeather(data));
  };

  const handleSearch = (value) => {
    console.log(`value: ${value}`);
    if (value.length < 2) return;
    fetchLocations({ cityName: value }).then((data) => {
      console.log(data);
      setLocations(data);
    });
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View className='flex-1 relative'>
      <StatusBar style='light' />
      <Image
        source={require('../assets/images/bg.png')}
        className='absolute h-full w-full'
        blurRadius={70}
      />
      <SafeAreaView className='flex flex-1'>
        {/* search section */}
        <View style={{ height: '7%' }} className='mx-4 relative z-50'>
          <View
            className='flex-row justify-end items-center rounded-full'
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
            }}
          >
            {showSearch && (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder='Search city'
                placeholderTextColor='lightgray'
                className='pl-6 h-10 pb-1 flex-1 text-base text-white'
              />
            )}
            <TouchableOpacity
              onPress={() => setShowSearch((prev) => !prev)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className='rounded-full p-3 m-1'
            >
              <MagnifyingGlassIcon size={25} color='white' />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch && (
            <View className='absolute w-full bg-gray-300/95 blur-3xl  top-16 rounded-3xl'>
              {locations.map((loc, index) => {
                const showBorder = index + 1 != locations.length;
                const borderClass = showBorder
                  ? 'border-b-2 border-b-gray-400'
                  : '';
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleLocation(loc)}
                    className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`}
                  >
                    <MapPinIcon size={20} color='gray' />
                    <Text className='text-black text-lg ml-2'>
                      {loc?.name}, {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        {/* forecast section */}
        <View className='mx-4 flex justify-around flex-1 mb-2'>
          {/* location */}
          <Text className='text-white text-center text-2xl font-bold'>
            {location?.name},
            <Text className='text-lg font-semibold text-gray-300'>
              {' '}
              {location?.country}
            </Text>
          </Text>
          {/* weather image */}
          <View className='flex-row justify-center'>
            <Image
              source={weatherImages[current?.condition?.text]}
              className='w-52 h-52'
            />
          </View>
          {/* degree celcius */}
          <View className='space-y-2'>
            <Text className='text-center font-bold text-white text-6xl ml-5'>
              {current?.temp_c}&#176;
            </Text>
            <Text className='text-center  text-white text-xl tracking-widest'>
              {current?.condition?.text}
            </Text>
          </View>
          {/* other stats */}
          <View className='flex-row justify-between mx-4'>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={require('../assets/icons/wind.png')}
                className='h-6 w-6'
              />
              <Text className='text-white font-semibold text-base'>
                {current?.wind_kph}km
              </Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={require('../assets/icons/drop.png')}
                className='h-6 w-6'
              />
              <Text className='text-white font-semibold text-base'>
                {current?.humidity}%
              </Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={require('../assets/images/sun.png')}
                className='h-6 w-6'
              />
              <Text className='text-white font-semibold text-base'>
                6:05 AM
              </Text>
            </View>
          </View>
        </View>

        {/* forecast for next days */}
        <View className='mb-2 space-y-3'>
          <View className='flex-row items-center mx-5 space-x-2'>
            <CalendarDaysIcon size={22} color='white' />
            <Text className='text-white text-base'>Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4
            '
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require('../assets/images/heavyrain.png')}
                className='h-11 w-11'
              />
              <Text className='text-white'>Monday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
            <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4
            '
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require('../assets/images/heavyrain.png')}
                className='h-11 w-11'
              />
              <Text className='text-white'>Tuesday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
            <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4
            '
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require('../assets/images/heavyrain.png')}
                className='h-11 w-11'
              />
              <Text className='text-white'>Monday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
            <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4
            '
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require('../assets/images/heavyrain.png')}
                className='h-11 w-11'
              />
              <Text className='text-white'>Monday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
            <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4
            '
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require('../assets/images/heavyrain.png')}
                className='h-11 w-11'
              />
              <Text className='text-white'>Monday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
            <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4
            '
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require('../assets/images/heavyrain.png')}
                className='h-11 w-11'
              />
              <Text className='text-white'>Monday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
            <View
              className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4
            '
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require('../assets/images/heavyrain.png')}
                className='h-11 w-11'
              />
              <Text className='text-white'>Monday</Text>
              <Text className='text-white text-xl font-semibold'>13&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
