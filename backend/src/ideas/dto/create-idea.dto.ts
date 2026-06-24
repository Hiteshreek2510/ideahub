export class CreateIdeaDto {
  title: string;
  description: string;
  tags?: string;
  media_url?: string;
  media_type?: string;
  is_anonymous?: boolean;
  encrypted_doc_path?: string;
  doc_iv?: string;
}
