import Logo from "@/app/assets/NewProject.png";
import Image from "next/image";
const loading = () => {
  return (
    <div className="flex bgLoad flex-col items-center h-[40rem]">
      {" "}
      <Image alt={"logo"} src={Logo} width={500} height={500} />
      <h1>Loading Data ...</h1>
      <h1>Please Wait</h1>
    </div>
  );
};

export default loading;
