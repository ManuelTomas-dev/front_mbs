type PresentationGenericProps = {
  title: string;
  description?: string;
};

function Title({ title, description }: PresentationGenericProps) {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground mt-2">{description}</p>
    </>
  );
}

export default Title;
