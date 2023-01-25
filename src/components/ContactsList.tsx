import { api } from "../utils/api";

export function ContactsList() {
  /**
  This harcoded value would be retrieved from the session data
  of the authenticated user in a production-ready application.
  */
  const userId = "39ad5f1f-7da1-48f4-8de3-ff29de51d5c5";

  const contactsQuery = api.contacts.getAllContacts.useQuery({ userId });

  if (contactsQuery.isError) return <span>something went wrong</span>;
  if (contactsQuery.isLoading) return <span>loading</span>;

  return (
    <div>
      <span>
        {contactsQuery.data?.map((contact) => (
          <div key={contact.id}>{contact.name}</div>
        ))}
      </span>
    </div>
  );
}
