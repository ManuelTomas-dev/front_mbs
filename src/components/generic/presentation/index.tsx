type PresentationGenericProps = {
  title: string;
  description: string;
};

function PresentationGeneric({ title, description }: PresentationGenericProps) {
  return (
    <div className="flex flex-col flex-1 p-5">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default PresentationGeneric;
