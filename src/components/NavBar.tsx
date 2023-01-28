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
      className={`items-center lg:mt-24 lg:h-24 lg:border-y lg:border-g-60 ${
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
      <div className="visible my-2 flex pl-4 pr-6 lg:hidden">
        <NavBarButtonWrapper className="flex w-full justify-start">
          <Button iconSrc="/icons/Back-arrow.svg"></Button>
        </NavBarButtonWrapper>
        <NavBarButtonWrapper className="flex w-full justify-end">
          <Button iconSrc="/icons/Light-mode.svg"></Button>
        </NavBarButtonWrapper>
      </div>
      <div className="w-full lg:grid lg:grid-cols-navbar">
        <NavBarButtonWrapper className="hidden justify-end pr-6 lg:flex">
          <Button iconSrc="/icons/Back-arrow.svg"></Button>
        </NavBarButtonWrapper>
        <div className="flex items-center gap-6 border-g-60 lg:w-[720px] lg:border-x lg:pt-24">
          <div className="grid w-full grid-cols-2 items-center gap-6 border-y border-g-60 p-6 lg:flex lg:h-24 lg:w-[720px] lg:flex-row">
            <Headline1 className="w-full">Contacts</Headline1>
            <div className="flex justify-end gap-2">
              <Button iconSrc="/icons/Settings.svg" />
              <Button iconSrc="/icons/Profile-pic.png"></Button>
            </div>
            <EditContactButton
              className="max-w-fit"
              onClick={() => setIsDialogOpen(true)}
            >
              Add new
            </EditContactButton>
          </div>
        </div>
        <NavBarButtonWrapper className="hidden justify-start pl-6 lg:flex">
          <Button iconSrc="/icons/Light-mode.svg"></Button>
        </NavBarButtonWrapper>
      </div>
    </div>
  );
}
