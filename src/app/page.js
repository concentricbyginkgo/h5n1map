import Container from "@/components/container/container";
import getData from "@/components/utils/data";

//export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home() {
  const allData = await getData();
  return (
    <main>
      <Container allData={allData} />
    </main>
  );
}
