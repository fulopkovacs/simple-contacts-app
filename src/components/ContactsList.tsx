import type { Contact } from "@prisma/client";
import { api } from "../utils/api";
import { Body, Headline3, Message } from "./Typography";
import Image from "next/image";
import { Button } from "./Button";
import { useContext } from "react";
import { AddContactDialogContext } from "../pages";

export function ContactListItem({ contact }: { contact: Contact }) {
  const utils = api.useContext();
  const deleteContactMutation = api.contacts.deleteContact.useMutation({
    onSuccess: async () => {
      await utils.contacts.invalidate();
    },
  });

  return (
    <div className="group/contact flex w-full items-center gap-4 py-3 first:pt-0">
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          src="/profile-pics/Default.png"
          fill
          alt=""
          className="object-cover"
        />
      </div>
      <div>
        <Headline3>{contact.name}</Headline3>
        <Message className="opacity-secondary">{contact.phone || "-"}</Message>
      </div>
      <div className="flex flex-grow items-center justify-end gap-2 opacity-0 group-hover/contact:opacity-100">
        <Button iconSrc="/icons/Mute.svg" />
        <Button iconSrc="/icons/Call.svg" />
        <Button iconSrc="/icons/More.svg" />
        <Button
          iconSrc="/icons/Delete.svg"
          onClick={() => {
            deleteContactMutation.mutate({ contactId: contact.id });
          }}
        />
      </div>
    </div>
  );
}

export function ContactsList() {
  /**
  This harcoded value would be retrieved from the session data
  of the authenticated user in a production-ready application.
  */
  const userId = "39ad5f1f-7da1-48f4-8de3-ff29de51d5c5";

  const contactsQuery = api.contacts.getAllContacts.useQuery({ userId });
  const { setIsOpen: dialogOpen } = useContext(AddContactDialogContext);

  if (contactsQuery.isError) return <span>something went wrong</span>;
  if (contactsQuery.isLoading) return <span>loading</span>;

  return contactsQuery.data.length > 0 ? (
    <div>
      {contactsQuery.data?.map((contact) => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </div>
  ) : (
    <>
      <Body className="pb-4">You currently have no contacts.</Body>
      <Button primary iconSrc="/icons/Add.svg" onClick={() => dialogOpen(true)}>
        Add new contact
      </Button>
    </>
  );
}
