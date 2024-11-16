import Image from "next/image";
import Content from "../components/Content.js";


export default function Home() {
  return (
    <>

      <div className="image">
        <Image
          src={"/1.webp"}
          alt=""
          height={3100}
          width={7600}
          priority={true}
        />
      </div>

      <Content />
    </>
  );
}
