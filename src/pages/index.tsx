import { type NextPage } from "next";
import Head from "next/head";
import { createContext, useState } from "react";
import { EditContactDialog } from "../components/EditContactDialog";
import { ContactsList } from "../components/ContactsList";
import { NavBar } from "../components/NavBar";
import { PageContent } from "../components/PageContent";
import { PageWrapper } from "../components/PageWrapper";

type EditContactDialogContextType = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

export const EditContactDialogContext =
  createContext<EditContactDialogContextType>({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsOpen: () => {},
  });
EditContactDialogContext.displayName = "EditContactDialogContext";

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
        <EditContactDialogContext.Provider value={{ isOpen, setIsOpen }}>
          <NavBar />
          <PageContent>
            <ContactsList />
          </PageContent>
          <EditContactDialog />
        </EditContactDialogContext.Provider>
      </PageWrapper>
    </>
  );
};

export default Home;
