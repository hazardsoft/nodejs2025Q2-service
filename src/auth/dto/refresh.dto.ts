import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  refreshToken: string;
}
