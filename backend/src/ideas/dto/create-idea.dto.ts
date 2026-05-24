export class CreateIdeaDto {
  title: string;
  description: string;
  tags: string[];
  is_anonymous?: boolean;
}
