"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import db_query from  "../../../helpers/db"
import { PostData } from "../../../helpers/fetch"
import {db } from "../../../helpers/db"
import { revalidatePath } from 'next/cache'
import { usePathname } from 'next/navigation'
import {UpdateDBValues} from '../../../helpers/fetch'

export default function Page({ params }) {
  console.log("params:", params);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  const meter = params.meter

  const [meterdata, setMeterData] = useState({});
  const fetchData = async () => {
    try {
      const result = await updateData(params.meter);
      setMeterData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId);
  }, [params.meter]);

  async function updateData(id) {
    const res = await fetch(`http://localhost:3000/api/meters?id=${id}`);
    const data = await res.json();
    setMeterData(data)
    revalidatePath('/meters'); // Invalidate the data
    return data;
  }

  // compute real time values
  const childNodes = meterdata?.message?.childNodes || [];
  const powerConsumption = meterdata?.message?.con_current * meterdata?.message?.con_voltage;
  const powerGeneration = meterdata?.message?.gen_current * meterdata?.message?.gen_voltage;
  const netPower = powerGeneration - powerConsumption || 0
  const current = meterdata?.message?.gen_current - meterdata?.message?.con_current || 0
  const voltage = meterdata?.message?.gen_voltage - meterdata?.message?.con_voltage || 0

  // console.log("meter:", meterdata.message)
  


    //initiate chart js object
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: false,
          text: "Chart.js Line Chart",
        },
      },
    };

    const currentDate = new Date();
    const timestamp = currentDate.getTime();


    const [fetchedDataset, setFetchedDataset] = useState([])
    const [labels, setTimestamps] = useState([])
    //upload new instance to db
    const newData = {
      id: meter,
      timestamp: [timestamp],
      props: [netPower],
      
    };

    //send real time data to database
    useEffect(() => {
      const intervalId = setInterval(() => {
        UpdateDBValues(newData).then((result) => {
          // console.log("db returned", result.data.user);
          setFetchedDataset(result.data.user.netPower);
          // setTimestamps(result.data.user.timestamp);
          convertTimestampsToDateTime(result.data.user.timestamp)
        });
      }, 5000); // Run every 5 seconds
    
      return () => clearInterval(intervalId);
    }, [newData]); 
  

    // labels.push(timestamps)
     //convert timestamps to datatime
  function convertTimestampsToDateTime(timestamps) {
    const holder = timestamps.map(timestamp => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
  
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    });
    console.log("holder", holder)
    setTimestamps(holder)
    
  }
    // console.log("label", timeLabel)
    const data = {
      labels,
      datasets: [
        {
          fill: true,
          label: meter,
          data: fetchedDataset,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    console.log("Graph data:", data)

  return (
    <div>
      <div className={styles.sides}>
        <div>
          <div>
            <p className={styles.meterNumber}>Register Meter ID:</p>
          <h1 className={styles.meterNumber}>{params.meter}</h1>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <Image src='/power.png' width={35} height={35} />
              <div>
                <h1>{netPower}W</h1>
                <h2>Net Power</h2>
              </div>
            </div>
            <div className={styles.card}>
            <Image src='/voltage.png' width={35} height={35} />
              <div>
                <h1>{voltage}(V)</h1>
                <h2>Net Voltage</h2>
              </div>
            </div>
            <div className={styles.card}>
            <Image src='/current.png' width={35} height={35} />
              <div>
                <h1>{current}(I)</h1>
                <h2>Net Current</h2>
              </div>
            </div>
          </div>

          <div className={styles.graph}>
            <Line options={options} data={data} />;
          </div>

          <div className={styles.childNode}>
            <h1>Children Nodes</h1>
            <h6>
              Note that these values are refreshed at the end of the power
              circle.{" "}
            </h6>
            {childNodes?.map((node, index) => (
              <div key={index}>
                <div className={styles.childNode}>
                  <span>
                    {index + 1}. {node.id}
                  </span>
                  <div className={styles.valuesPairs}>
                    <span>Net Rating: </span>
                    <p>{node.netConsumption}W</p>
                  </div>
                  <div className={styles.valuesPairs}>
                    <span>Status: </span>
                    <p>{node.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mapRight}>
          <iframe
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDoev8HpfCUgOZg10n-LQuvF0tb6TGC5W4&q=Space+Needle,Seattle+WA"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
