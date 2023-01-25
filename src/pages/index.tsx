import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { AddContactButton, Button } from "../components/Button";
import { ContactsList } from "../components/ContactsList";
import { NavBar } from "../components/NavBar";
import { PageContent } from "../components/PageContent";
import { PageWrapper } from "../components/PageWrapper";
import {
  Body,
  Headline1,
  Headline2,
  Headline3,
  Message,
} from "../components/Typography";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hundred: number[] = [];
  for (let i = 0; i < 100; i++) {
    hundred.push(i);
  }

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
          <div className="flex w-min flex-col gap-2">
            <Button>Add new</Button>
            <Button primary>Add new</Button>
            <Button primary iconSrc="/icons/Add.svg">
              Add new
            </Button>
            <Button primary iconSrc="/icons/Add.svg"></Button>
            {
              //start
              /* hundred.map((val) => (
                <div key={val}>{val}</div>
              )) */
              //end
            }
            <AddContactButton>Add new</AddContactButton>
          </div>
        </PageContent>
      </PageWrapper>
    </>
  );
};

export default Home;
