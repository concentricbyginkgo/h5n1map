'use client';
import backupData from '../../../public/data/combined_data.json'
export default async function getData() {
    try {
        const url = process.env.NEXT_PUBLIC_BUCKET_URL + process.env.NEXT_PUBLIC_FILE_NAME;
        const res = await fetch(url);
        if (res.status === 200) {
            const data = await res.json()
            return data
        } else {
            console.log('Response was not 200, using backup data')
            return backupData
        }
    } catch (error) {
        console.log('Failed to fetch data from bucket, using backup data')
        console.log(error)
        return backupData
    }
}