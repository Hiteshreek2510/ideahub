export class CreateUserDto {
  id: string; // The UUID provided by Supabase Auth
  username: string;
  email: string;
}
