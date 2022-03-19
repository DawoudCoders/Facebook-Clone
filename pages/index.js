import Head from "next/head";
import { getSession } from "next-auth/react";
import { Header } from "../Components/Header";
import { Login } from "../Components/Login";
import { Sidebar } from "../Components/Sidebar";
import { Feed } from "../Components/Feed";
import  Widgets from "../Components/Widgets"

export default function Home({ session }) {
  if (!session) return <Login />;
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />
      <main className="flex">
        <Sidebar />
        <Feed />
        <Widgets />
      
   
      
      </main>
    </div>
  );
}

//context comes from the request when the user comes to the page
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return { props: { session } };
}
