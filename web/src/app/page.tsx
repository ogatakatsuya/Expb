"use client";

import { useEffect, useState } from 'react';
import { database } from '../lib/firebase/firebaseConfig';
import { onChildAdded, ref } from '@firebase/database';
import { FirebaseError } from '@firebase/util';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const DataPage = () => {
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [humidityData, setHumidityData] = useState<number[]>([]);

  useEffect(() => {
    try {
      const temperatureRef = ref(database, 'Temperature');
      const unsubscribeTemperature = onChildAdded(temperatureRef, (snapshot) => {
        const newTemperature = Number(snapshot.val());
        console.log("New temperature added: ", newTemperature);
        setTemperatureData((prev) => {
          const updatedData = [...prev, newTemperature];
          return updatedData.slice(-30);
        });
      });

      const humidityRef = ref(database, 'Humidity');
      const unsubscribeHumidity = onChildAdded(humidityRef, (snapshot) => {
        const newHumidity = Number(snapshot.val());
        console.log("New humidity added: ", newHumidity);
        setHumidityData((prev) => {
          const updatedData = [...prev, newHumidity];
          return updatedData.slice(-30);
        });
      });

      // Cleanup function to remove the listeners when the component unmounts
      return () => {
        unsubscribeTemperature();
        unsubscribeHumidity();
      };
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e);
      }
    }
  }, []);

  const combinedData = {
    labels: temperatureData.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData,
        fill: false,
        borderColor: 'red',
        tension: 0.1,
        yAxisID: 'y-axis-temperature',
      },
      {
        label: 'Humidity (%)',
        data: humidityData,
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
        yAxisID: 'y-axis-humidity',
      },
    ],
  };

  const options = {
    scales: {
      'y-axis-temperature': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      'y-axis-humidity': {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Humidity (%)',
        },
        grid: {
          drawOnChartArea: false, // Only draw grid lines for one axis
        },
      },
    },
  };

  return (
    <> 
      <h1 className='text-2xl md:text-3xl lg:text-4xl flex justify-center my-2'>
        Real Time Temperature & Humidity
      </h1>
      <h2 className='text-lg md:text-xl lg:text-2xl flex justify-center my-2'>
        Last 30 data points in Osaka University
      </h2>
      <div className='h-[60vh] md:h-[70vh] lg:h-[80vh] w-[90vw] mx-auto'>
        <Line data={combinedData} options={options} />
      </div>
    </>
  );
};

export default DataPage;
