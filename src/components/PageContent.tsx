/**
A reusable component that should wrap around the content of the page
(anything below the navigation bar.)
*/
export function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-fit w-full flex-grow justify-center">
      <div className="w-full p-6 md:w-[600px] md:border-x md:border-g-60 lg:w-[720px]">
        {children}
      </div>
    </div>
  );
}
