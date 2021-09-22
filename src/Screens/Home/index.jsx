import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../styles/Colors';
import tailwind from 'tailwind-rn'
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../../Components/IconButton';
import Title from '../../Components/Title';
import ProductSlider from '../../Components/ProductSlider';
import CollectionSlider from '../../Components/CollectionSlider';
import { useStore } from '../../Store';

const { width, height } = Dimensions.get('screen')

function HomeScreen({ navigation }) {

  const navigate = (route,params) => {
    navigation.navigate(route,params)
  }

  const [newArrival, setNewArrival] = useState([
    {
      id:'0',
      name: 'Name 1',
      img: require('../../assets/imgs/3.jpg'),
      price: "12",
      saved: false
    },
    {
      id:'1',
      name: 'Name 2',
      img: require('../../assets/imgs/4.jpg'),
      price: "20",
      saved: true
    },
    {
      id:'2',
      name: 'Name 3',
      img: require('../../assets/imgs/3.jpg'),
      price: "39",
      saved: true
    },
    {
      id:'3',
      name: 'Name 4',
      img: require('../../assets/imgs/4.jpg'),
      price: "440",
      saved: false
    },
  ])
  const [collection, setCollection] = useState([
    {
      id:'0',
      name: 'Name 1',
      img: require('../../assets/imgs/3.jpg'),
    },
    {
      id:'1',
      name: 'Name 2',
      img: require('../../assets/imgs/4.jpg'),
    },
    {
      id:'2',
      name: 'Name 3',
      img: require('../../assets/imgs/3.jpg'),
    },
    {
      id:'3',
      name: 'Name 4',
      img: require('../../assets/imgs/4.jpg'),
    },
  ])

  const setRoute = useStore(state=>state.setRoute)
  const Toast = useStore(state=>state.Toast)

  const [loading,setLoading] = useState(true)

  const saveProduct = (index) => {
    const temp = [...newArrival]
    temp[index].saved = !temp[index].saved
    setNewArrival(temp)
    if(temp[index].saved)
      Toast('Product saved ✓')
  } 

  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
    const unsubscribe = navigation.addListener('focus', () => {
      setRoute('Home')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation])

  return (
    <View style={styles.screen}>

      <View style={[tailwind('w-full flex-row px-4 pb-3 items-center justify-between'),{borderColor: colors.gray+'4f',borderBottomWidth:0.2}]}>
        
        <IconButton onPress={()=>{}}>
          <Ionicons name="ios-menu" size={18} color={colors.black}/>
        </IconButton>
      
        {/* <Text>Shopi</Text> */}

        <IconButton>
          <Ionicons name="ios-search" size={18} color={colors.black}/>
        </IconButton>
      
      </View>

      <ScrollView style={tailwind('pt-2')} showsVerticalScrollIndicator={false}>
        {
          loading ?
          <ActivityIndicator size={32} color={colors.primary} style={[tailwind('items-center justify-center'),{height:height-200}]}/>
          :
          <>
            <Title text="New Arrival" onPress={()=>navigate('Products',{title:'New Arrival'})}/>
            <ProductSlider products={newArrival} save={saveProduct}/>

              <View style={tailwind('h-4')}/>
            
            <Title text="Collections" seeAll={false}/>
            <CollectionSlider products={collection}/>

              <View style={tailwind('h-20')}/>
          </>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    width, 
    height,
    backgroundColor:colors.secondary,
    alignItems: 'center',
    paddingTop:Constants.statusBarHeight+18,
    
  }
})

export default HomeScreen
