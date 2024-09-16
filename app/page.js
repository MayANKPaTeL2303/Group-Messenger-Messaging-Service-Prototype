//Dashboard page
import Navbar from "./components/Navbar";
import CreateCard from "./components/CreateCard";
import JoinCard from "./components/JoinCard";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row p-40 space-x-10">
        <CreateCard/>
        <JoinCard title="Join Group" select="Join"/>
      </div>
    </div>
  );
}
