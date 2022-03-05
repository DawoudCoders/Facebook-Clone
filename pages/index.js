import Head from "next/head";
import { getSession } from "next-auth/react";
import { Header } from "../Components/Header";
import { Login } from "../Components/Login";
import { Sidebar } from "../Components/Sidebar";

export default function Home({ session }) {
  console.log(session);
  if (!session) return <Login />;
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />
      <main>
        <Sidebar />
        {/* SideBar */}
        {/* Feed */}
        {/* Widget */}
      </main>
    </div>
  );
}

//context comes from the request when the user comes to the page
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return { props: { session } };
}
