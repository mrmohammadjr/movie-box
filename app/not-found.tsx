import Logo from "@/app/assets/NewProject.png";
import Image from "next/image";
const Notfound = () => {
  return (
    <div className="flex flex-col items-center my-32">
      {" "}
      <Image alt={"logo"} src={Logo} width={500} height={500} />
      <h1 className="text-7xl">Wrong Page - 404</h1>
    </div>
  );
};

export default Notfound
