import backupData from '../../../public/data/combined_data.json'
export default async function getData() {
    try {
        const res = await fetch(process.env.BUCKET_URL)
        if (res.status === 200) {
            const data = await res.json()
            return data
        } else {
            console.log('Response was not 200, using backup data')
            return backupData
        }
    } catch (error) {
        console.log('Failed to fetch data from bucket, using backup data')
        return backupData
    }
}