import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';

export default function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation = (loc) => {
    console.log(`location: ${loc}`);
  };

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
            <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
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
                    <Text className='text-black text-lg ml-2'>London, UK</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
