import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
  //gives title to the authpage 
  { title: 'Resumind | Auth' },
  { name: 'description', content: "log in to your account" },
]);

//implementing auth 
const auth = () => {
  //we are accessing loading state directly from puter store
  const { isLoading, auth } = usePuterStore();

  //handling redirection if user is already logged in
  
  //extracting next parameter from the URL
  const location=useLocation();
  const next=location.search.split('next=')[1];
  const navigate=useNavigate();
    //called when isauthenticated changes
  useEffect(()=>{
    // if authenticated, navigate to the next page
    if(auth.isAuthenticated){
      navigate(next);

    }

  },[auth.isAuthenticated,next])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to Resumind</h1>
            <p className="text-gray-600">Log in to your account to get started</p>
          </div>

          <div>
            {/* loading:not loading(empty) */}
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you</p>
              </button>
            ) : (
                 <>
                  {auth.isAuthenticated?(
                    <button className="auth-button" onClick={auth.signOut}>
                     <p>Log Out</p>
                    </button>
                  ):
                  <button className="auth-button" onClick={auth.signIn}>
                     <p> Log In</p>
                    </button>
                  }
                 </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default auth;
