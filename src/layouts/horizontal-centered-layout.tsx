const HorizontalCenteredLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <main className='flex flex-col w-full min-w-0 items-center px-4 py-14 md:px-14 lg:px-28'>
    {children}
  </main>
);

export default HorizontalCenteredLayout;
