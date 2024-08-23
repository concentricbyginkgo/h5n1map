import UploadForm from "@/components/upload/uploadForm";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;
export default async function Home() {
  const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
  const fileNames = ["combined_h5n1_animal_surveillance_data.csv", "H5N1_human_surveillance_data.csv"];

  return (
    <main>
      <div className='dynaMargin dynaPad fontXL flexV'>
        <UploadForm fileName={fileNames[0]} />
        <UploadForm fileName={fileNames[1]} />
      </div>
    </main>
  );
}