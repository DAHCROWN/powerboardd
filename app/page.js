"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation'


import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatEther } from "viem/utils";
import { useAccount, useBalance, useContractRead } from "wagmi";
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";

export default function Home() {  
  //init wallet 
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);



  const router = useRouter();
//navbar
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  //Scatter Component
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: 'Residential Buildings',
        data: Array.from({ length: 100 }, () => ({
          x: faker.datatype.number({ min: 0, max: 100 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
        })),
        backgroundColor: '#000000',
      },
      {
        label: 'Offices & Laboratoies',
        data: Array.from({ length: 100 }, () => ({
          x: faker.datatype.number({ min: 0, max: 100 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
        })),
        backgroundColor: '#309CFF',
      },
      {
        label: 'Industrial Building',
        data: Array.from({ length: 10 }, () => ({
          x: faker.datatype.number({ min: 0, max: 100 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
        })),
        backgroundColor: '#ff0000',
      }
    ],
  };



const Search = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your desired function here with the form data
    console.log('Form data submitted:', formData.meter);
    const meterNumber = formData.meter
    router.push(`/meters/${meterNumber}`)
    // redirect(`/${meterNumber}`);
  };


    return (
      <div className={styles.form}>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="meter"
            value={formData.meter}
            onChange={handleInputChange}
            placeholder='Enter Meter Number'
          />
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  }

  if (!isConnected)
    return (
      <main className={styles.main}>
        <div>
          <ConnectButton
          label="Connect Wallet"
          accountStatus="address"
          chainStatus="none"
          showBalance={false}
        />
        </div>

      </main>
    );



  return (
    <main className={styles.main}>
      <nav className={styles.navBar}>
        <button
          className={activeButton === 'button1' ? 'active' : ''}
          onClick={() => handleButtonClick('button1')}
        >
          Explore
        </button>
        <button
          className={activeButton === 'button2' ? 'active' : ''}
          onClick={() => handleButtonClick('button2')}
        >
          Search
        </button>
        <style jsx>{`
          button {
            padding: 10px 20px;
            margin: 5px;
            background: #309cff;
            border: none;
            cursor: pointer;
            border-radius: 30px;
          }
          button.active {
            color: #309CFF;
            background-color: white;
            height: 40px;
            width: 150px;
            margin: 5px;

          }
        `}</style>
      </nav>

      <div className={styles.graph}>
        {/* <Scatter options={options} data={data} width={800} height={300} /> */}
      </div>
      <div>
        <Search />
      </div>
          
    </main>
  )
}
