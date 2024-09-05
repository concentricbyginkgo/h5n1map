import Container from "@/components/container/container";
import oldData from '../../public/data/combined_data.json';

export default async function Home() {
  return (
    <main>
      <Container allData={oldData} />
    </main>
  );
}
