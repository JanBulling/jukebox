const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className='grid size-full grid-cols-[1fr] grid-rows-[auto_1fr_auto]'>
    {children}
  </div>
);

export default BaseLayout;
