/**
A reusable component that should wrap around the content of the page
(anything below the navigation bar.)
*/
export function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-fit w-full flex-grow justify-center">
      <div className="w-[720px] border-x border-g-60 p-6">{children}</div>
    </div>
  );
}
