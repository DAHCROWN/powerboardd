"use client";
import styles from "./page.module.css";
import React, { useEffect } from "react";
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
import db_query from  "../../helpers/db"
import { PostData } from "../../helpers/fetch"


export default function Page({ params }) {
  console.log("params:", params);
  const meterDetails = {
    id: params.slug,
    registeredName: "",
    location: {
      log: 23,
      lat: 45,
    },
    parentNode: "",
    childNodes: [],
    currentDraw: 56,
    voltageDraw: 45,
    consumptionHIstory: "",
    ProductionHistory: "",
  };

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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  
  const meter = params.meter
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: meter,
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  

  useEffect(() => {
    PostData().then((result) => {
      console.log("displaying", result);
    });
  }, []);

  while(true){
    (function logEveryTwoSeconds() {
      const meter_id = params.meter
      const res = db_query(meter_id)
      console.log("fetched", res)
      const childNodes = res.childNodes
      const powerConsumption = res.con_current * res.con_voltage
      const powerGeneration = res.gen_current * res.gen_voltage
      const netPower = powerGeneration - powerConsumption;
      setTimeout(logEveryTwoSeconds, 5000);
    })();
  }
  



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
                <h1>{res.con_current}</h1>
                <h2>Voltage Draw</h2>
              </div>
            </div>
            <div className={styles.card}>
            <Image src='/current.png' width={35} height={35} />
              <div>
                <h1>{res.con_voltage}</h1>
                <h2>Current Draw</h2>
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
