import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">

  {/* //navbar component imported here */}

  <Navbar/>


    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume</h1>
        <h2>Review your submissions and check AI_powered feedback</h2>
      </div>

      {/* here we import data in array format like title,etc info ..instead of doing here we write in index.ts in constants file ..it would form a db */}

    </section>
  </main>
}
