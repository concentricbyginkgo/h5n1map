import fs from "node:fs/promises";
import UploadForm from "@/components/upload/uploadForm";

export default async function Home() {
  const files = await fs.readdir("./public/data");
  const fileNames = ["combined_h5n1_animal_surveillance_data.csv", "H5N1_human_surveillance_data.csv"];
  const data = await Promise.all(
    files
      .filter((file) => fileNames.includes(file))
      .map(async (file) => {
        const stats = await fs.stat(`./public/data/${file}`);
        return {
          path: `/data/${file}`,
          modifiedDate: stats.mtime
        };
      })
  );

  const currentColorAnimal = 'blue';
  const currentColorHuman = 'blue';

  return (
    <main>
      <div className='dynaMargin dynaPad fontXL' style={{ display: 'block', marginTop: '10%', marginLeft: 'auto', marginRight: 'auto', width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <UploadForm fileName={fileNames[0]} currentColor={currentColorAnimal} datafile={data[0]} />
        <UploadForm fileName={fileNames[1]} currentColor={currentColorHuman} datafile={data[1]} />
      </div>
    </main>
  );
}