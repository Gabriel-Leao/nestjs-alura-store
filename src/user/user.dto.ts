import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length
} from 'class-validator'

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  id?: string

  @IsNotEmpty({ message: 'O e-mail não pode ser vazio.' })
  @IsEmail()
  email: string

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @Length(3, 20, {
    message: 'O nome tem que ter no mínimo 3 letras e no máximo 20'
  })
  @IsString({ message: 'O nome tem que ser um texto' })
  name: string

  @IsOptional()
  @IsNotEmpty({ message: 'O sobrenome não pode ser vazio' })
  @Length(3, 20, {
    message: 'O sobrenome tem que ter no mínimo 3 letras e no máximo 20'
  })
  @IsString({ message: 'O sobrenome tem que ser um texto' })
  last_name?: string

  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 0
    },
    {
      message:
        'A senha tem que ter no mínimo oito caracteres, sendo no mínimo uma letra minuscula, uma letra maiúscula e um número'
    }
  )
  password: string

  @IsOptional()
  @IsDate()
  created_at?: Date

  @IsOptional()
  @IsDate()
  updated_at?: Date

  @IsOptional()
  @IsNotEmpty({ message: 'O role não pode ser vazio' })
  @IsEnum(UserRole, { message: 'O role só pode ser "ADMIN" ou "USER"' })
  role: UserRole
}
