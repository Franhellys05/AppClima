/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { StyleSheet } from 'react-native';


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
  const styles = StyleSheet.create({
          container: {
            flex: 1,
            padding: 16,
            backgroundColor: '#fff',
          },
          listItem: {
            marginBottom: 16,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
          },
          locationText: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          temperatureText: {
            fontSize: 16,
            marginTop: 4,
          },
          conditionText: {
            fontSize: 14,
            color: '#888',
          },
        });

        return (
          <View style={styles.container}>
            {climaData.map((clima, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.locationText}>
                  Ubicación: {clima.location.name}, {clima.location.region}, {clima.location.country}
                </Text>
                <Text style={styles.temperatureText}>
                  Temperatura: {clima.current.temp_c}°C
                </Text>
                <Text style={styles.conditionText}>
                  Condición: {clima.current.condition.text}
                </Text>
              </View>
            ))}
          </View>
        );

            };
export default ClimaScreen;
