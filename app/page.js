//Dashboard page
import CreateCard from "./components/CreateCard";
import JoinCard from "./components/JoinCard";
import Link from "next/link";
import Box from "./components/Box"

export default function Home() {
  return (
    <div>
      <div className="flex flex-row p-40 space-x-10">
        <Box/>
        {/* <CreateCard />
        <JoinCard title="Join Group" select="Join" /> */}
      </div>
    </div>
  );
}
