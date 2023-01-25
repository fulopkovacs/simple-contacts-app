import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { AddContactButton, Button } from "../components/Button";
import { ContactsList } from "../components/ContactsList";
import { NavBar } from "../components/NavBar";
import { PageContent } from "../components/PageContent";
import { PageWrapper } from "../components/PageWrapper";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contacts</title>
        <meta name="description" content="Simple contacts app demo" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <PageWrapper>
        <NavBar />
        <PageContent>
          <ContactsList />
        </PageContent>
      </PageWrapper>
    </>
  );
};

export default Home;
