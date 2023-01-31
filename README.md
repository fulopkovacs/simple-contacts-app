# Contacts App

A simple contacts app. This full-stack project uses the following tech stack (see the [Tech Stack](#nerd_face-tech-stack) section for why some of them were picked):

**:sun_with_face: Front End**

- `react`
- `Tailwind CSS`
- `framer-motion`
- `Next.js`
- `TypeScript`
- [`react-phone-number-input`](#react-phone-number-input)
- [`@radix-ui/react-dropdown-menu`](#radix-uireact-dropdown-menu-a-headless-ui-component)

**:first_quarter_moon_with_face: Back End**

- [`trpc`](#trpc)
- `react-query` (through `trpc`)
- `prisma`
- `SQLite`
- `Next.js`
- `TypeScript`

This project was created using [`create-t3-app`](https://create.t3.gg/) (I'm a fan of the `t3-stack` :relaxed:).

## :movie_camera: Demos

> Check out the [README on GitHub](https://github.com/fulopkovacs/simple-contacts-app/edit/main/README.md#movie_camera-demos), if you don't see any videos below this message.

https://user-images.githubusercontent.com/43729152/215851661-783a3378-01ee-44ad-9b94-c84e72a53144.mp4

https://user-images.githubusercontent.com/43729152/215851682-0b89cf83-763a-478d-a96c-788997828bb0.mp4

## :gear: Setup

Install the dependencies:

```bash
pnpm install
```

Set up the dev db:

```bash
pnpx prisma db push
```

Seed the db:

```bash
pnpm db-seed
```

## :bookmark_tabs: Usage

Run the dev server:

```bash
# Starts the dev server on
# https://localhost:3000
# if the port is not taken
pnpm dev
```

Inspect the db:

```bash
# This command should automatically
# open up the prisma studio interface in
# the default web browser
# (https://localhost:5555)
pnpm studio
```

Reset the contents of the db to the seed data:

```bash
pnpm db-reset-dev
```

## :nerd_face: Tech Stack

Some parts of the stack were not mentioned in the job description. I'd like to explain why I still decided to use them.

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
- only JSON request/response payloads (no `multpart/form-data`, all images need to be encoded in `base64`, but [you can use an object storage + CDN with pre-signed URL-s for images](https://github.com/trpc/trpc/issues/1401#issuecomment-1047215657), it's a lot better place for hosting + serving images anyways -- I'm happy to expand on this in person)
- it's stable, but still young and most people would consider it _"bleeding edge"_ (based on the stack mentioned in the job description, I thought you would be comfortable with this)

### [`@radix-ui/react-dropdown-menu`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu) (a headless ui component)

**:heavy_check_mark: Why?**

- dropdown menus are in fact pretty complex - they take an unreasonable development time considering all the edge cases and accessibility concerns
  - this talk summarizes the issues pretty well: [So You Think You Can Build A Dropdown? - Pedro Duarte - (Next.js Conf 2021)](https://www.youtube.com/watch?v=pcMYcjtWwVI&t=591s)
- this unstyled headless UI component from radix ui is flexible enough to cover most use cases
- it has great documentation
- outsourcing the complex logic, edge case testing, accessibility issues to a well-documented third-party library like this ultimately results in a more maintainable code base and a faster development pace

**:x: When would I avoid it?**

- if bundle size is really important

### [`react-phone-number-input`](https://catamphetamine.gitlab.io/react-phone-number-input/)

**:heavy_check_mark: Why?**

- it's relatively hard to safely parse and validate phone numbers (I looked into it)
  - I'd rather outsource the solution to a properly-documented library than to write and maintain custom code for it (this also makes collaboration on our code base easier)

**:x: When would I avoid it?**

- if bundle size is important (it's relatively heavy)
