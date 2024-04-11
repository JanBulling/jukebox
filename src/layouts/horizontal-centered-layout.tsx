const HorizontalCenteredLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div className='flex flex-col w-full min-w-0 items-center'>{children}</div>
);

export default HorizontalCenteredLayout;
