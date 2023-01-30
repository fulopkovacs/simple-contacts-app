# Contacts App

A simple contacts app. This full-stack project uses the following tech stack (see the [Tech Stack](#tech-stack) section for a more detailed list):

**:sun_with_face: Front End**

- `react`
- `Tailwind CSS`
- `framer-motion`
- `Next.js`
- `TypeScript`
- `@radix-ui/react-dropdown-menu`

**:first_quarter_moon_with_face: Back End**

- `trpc`
- `react-query` (through `trpc`)
- `prisma`
- `SQLite`
- `Next.js`
- `TypeScript`

## :gear: Setup

Install the project's dependencies:

```bash
pnpm install
```

- [ ] Setup prisma
- [ ] Seed the db

## :bookmark_tabs: Usage

Run the dev server:

```bash
pnpm dev
```

Inspect the db:

```bash
pnpm studio
```

## :nerd_face: Tech Stack

Some parts of the stack were not mentioned in the job ad. I'd like to explain why I still decided to use them.

### [`trpc`](https://trpc.io)

**:heavy_check_mark: Why?**

- end-to-end typesafety
- great integration with `prisma` and `react-query`

  - e.g.: Let's say we want to invalidate all queries that fetch data from a certain API endpoint:

    ```typescript
    import { api } from "../utils/api";

    // `utils` contains a collection of thin wrappers around
    // `queryClient` methods
    const utils = api.useContext();

    /*
    The API endpoint is at `contacts.getAllContacts` (it returns all the contacts
    for a given user).
    Thanks to TypeScript's inference capabilities, our IDE-s can
    autocomplete and validate all the API endpoints while typing.
    We also don't have to worry about query keys, or to manually keep track
    what's in the cache of `react-query`, because `trpc` handles it all.
    */
    utils.contacts.getAllContacts.invalidate();
    ```

- the API is documented "in the IDE" (autocompletion, input validation with TypeScript)
- useful error messages out of the box (it's possible because the inputs have type validation with [`zod`](https://zod.dev/))

**:x: When would I avoid it?**

- not great for public API-s (it uses the Remote Procedure Call (RPC) protocol instead of REST)
- works best with monorepos, where the front end code co-exists with the back end code
- only JSON request/response payloads (no `multpart/form-data`, all images need to be encoded in `base64`, although you should use an object storage + CDN with pre-signed URL-s for images in most cases anyways -- I'd happily expand on this in person if you're interested in it)
- it's stable, but still young and most people would consider it _"bleeding edge"_

### [`@radix-ui/react-dropdown-menu`]

**:heavy_check_mark: Why?**

- dropdown menus are too complex - they take an unreasonable development time considering all the edge cases and accessibility concerns
  - Check out this talk if you don't believe me: [So You Think You Can Build A Dropdown? - Pedro Duarte - (Next.js Conf 2021)](https://www.youtube.com/watch?v=pcMYcjtWwVI&t=591s)
