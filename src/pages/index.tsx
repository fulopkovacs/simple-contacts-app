import { type NextPage } from "next";
import Head from "next/head";
import { createContext, useState } from "react";
import { AddContactDialog } from "../components/AddContactDialog";
import { ContactsList } from "../components/ContactsList";
import { NavBar } from "../components/NavBar";
import { PageContent } from "../components/PageContent";
import { PageWrapper } from "../components/PageWrapper";

type AddContactDialogContextType = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

export const AddContactDialogContext =
  createContext<AddContactDialogContextType>({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsOpen: () => {},
  });
AddContactDialogContext.displayName = "AddContactDialogContext";

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Contacts</title>
        <meta name="description" content="Simple contacts app demo" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <PageWrapper>
        <AddContactDialogContext.Provider value={{ isOpen, setIsOpen }}>
          <NavBar />
          <PageContent>
            <ContactsList />
          </PageContent>
          <AddContactDialog />
        </AddContactDialogContext.Provider>
      </PageWrapper>
    </>
  );
};

export default Home;
