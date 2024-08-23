import UploadForm from "@/components/upload/uploadForm";

export default async function Home() {
  
  const fileNames = ["combined_h5n1_animal_surveillance_data.csv", "H5N1_human_surveillance_data.csv"];

  return (
    <main>
      <div className='dynaMargin dynaPad fontXL flexV' style={{ display: 'block', marginTop: '10%', marginLeft: 'auto', marginRight: 'auto', width: '80%', display: 'flex', alignItems: 'center' }}>
        <UploadForm fileName={fileNames[0]} />
        <UploadForm fileName={fileNames[1]} />
      </div>
    </main>
  );
}