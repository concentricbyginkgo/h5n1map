'use client';
import styles from './globals.css';
import Container from "@/components/container/container";
import getData from "@/components/utils/data";
import { useState } from 'react';

export const dynamic = 'force-static';
export default function Home() {
  const [allData, setAllData] = useState({});

  getData().then((data) => {
    setAllData(data);
  });

  return (
    <main>
      <Container allData={allData} />
    </main>
  );
}
