import {
  Card as Container,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  title: string;
  content: string;
}

function Card({ title, content }: CardProps) {
  return (
    <Container>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
      </CardContent>
    </Container>
  );
}

export default Card;
