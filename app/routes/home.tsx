import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import { resumes } from "../../constants/index";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback!" },
  ];
}

export default function Home() {
  const {auth} = usePuterStore();
  const navigate=useNavigate();
    //called when isauthenticated changes
  useEffect(()=>{
    // if authenticated, navigate to the next page
    if(!auth.isAuthenticated){
      navigate('/auth?next=/');

    }

  },[auth.isAuthenticated])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">

  {/* //navbar component imported here */}

  <Navbar/>


    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume</h1>
        <h2>Review your submissions and check AI_powered feedback</h2>
      </div>

      {resumes.length>0 && <div className="resumes-section">
         {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
      </div> }
      
     


      

      {/* here we import data in array format like title,etc info ..instead of doing here we write in index.ts in constants file ..it would form a db */}
      
    </section>
  </main>
}
