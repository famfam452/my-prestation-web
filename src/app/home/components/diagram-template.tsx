type DiagramTemplateProps = {
  children?: React.ReactNode;
};

const DiagramTemplate = ({ children }: DiagramTemplateProps) => {
  return <div className="mt-7 flex w-full items-center justify-center rounded-2xl">{children}</div>;
};

export default DiagramTemplate;
