/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const ClimaScreen = () => {
  const [climaData, setClimaData] = useState(null);
  // Lista de paises que desea mostrar
  const countries = ['Nicaragua', 'Costa Rica', 'Honduras'];

  useEffect(() => {
    const fetchClimaData = async () => {
      try {
        const responsePromises = countries.map(country =>
          axios.get(`https://api.weatherapi.com/v1/current.json?key=b9b65e6843c84480bca35513233006&q=${country}&lang=es`)
        );

        const responses = await Promise.all(responsePromises);
        const climaDataArray = responses.map(response => response.data);
        setClimaData(climaDataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClimaData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!climaData) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View>
      {climaData.map((clima, index) => (
        <View key={index}>
          <Text>Ubicacion: {clima.location.name}, {clima.location.region}, {clima.location.country}</Text>
          <Text>Temperatura: {clima.current.temp_c}°C</Text>
          <Text>Condicion: {clima.current.condition.text}</Text>
          <Text>--------------------------------</Text>
        </View>
      ))}
    </View>
  );
};

export default ClimaScreen;
