import { useContext } from "react";
import { EditContactDialogContext } from "../pages";
import { EditContactButton, Button } from "./Button";
import { Headline1 } from "./Typography";

export function NavBarButtonWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-24 flex h-24 items-center border-y border-g-60 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}

/**
The navigation bar.
*/
export function NavBar() {
  const { setIsContactDialogOpen: setIsDialogOpen } = useContext(
    EditContactDialogContext
  );

  return (
    <div className="sticky top-0 z-20 w-full flex-grow-0 border-g-60 bg-g-100">
      <div className="grid w-full grid-cols-navbar">
        <NavBarButtonWrapper className="justify-end pr-6">
          <Button iconSrc="/icons/Back-arrow.svg"></Button>
        </NavBarButtonWrapper>
        <div className="flex w-[720px] items-center gap-6 border-x border-g-60 pt-24">
          <div className="flex h-24 w-[720px] items-center gap-6 border-y border-g-60 p-6">
            <Headline1 className="w-full">Contacts</Headline1>
            <div className="flex gap-2">
              <Button iconSrc="/icons/Settings.svg" />
              <Button iconSrc="/icons/Profile-pic.png"></Button>
            </div>
            <EditContactButton onClick={() => setIsDialogOpen(true)}>
              Add new
            </EditContactButton>
          </div>
        </div>
        <NavBarButtonWrapper className="justify-start pl-6">
          <Button iconSrc="/icons/Light-mode.svg"></Button>
        </NavBarButtonWrapper>
      </div>
    </div>
  );
}
