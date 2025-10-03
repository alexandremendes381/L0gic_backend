import { IsEmail, IsNotEmpty, IsPhoneNumber, IsDateString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @Length(2, 255, { message: 'Nome deve ter entre 2 e 255 caracteres' })
    name!: string;

    @IsEmail({}, { message: 'Email deve ser válido' })
    @IsNotEmpty({ message: 'Email é obrigatório' })
    email!: string;

    @IsPhoneNumber('BR', { message: 'Telefone deve ser um número brasileiro válido' })
    @IsNotEmpty({ message: 'Telefone é obrigatório' })
    phone!: string;

    @IsNotEmpty({ message: 'Cargo é obrigatório' })
    @Length(2, 255, { message: 'Cargo deve ter entre 2 e 255 caracteres' })
    position!: string;

    @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida (YYYY-MM-DD)' })
    @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
    @Transform(({ value }) => {
        const date = new Date(value);
        const today = new Date();
        if (date > today) {
            throw new Error('Data de nascimento não pode ser no futuro');
        }
        return value;
    })
    birthDate!: string;

    @IsNotEmpty({ message: 'Mensagem é obrigatória' })
    @Length(10, 1000, { message: 'Mensagem deve ter entre 10 e 1000 caracteres' })
    message!: string;
}

export class UpdateUserDto {
    @Length(2, 255, { message: 'Nome deve ter entre 2 e 255 caracteres' })
    name?: string;

    @IsEmail({}, { message: 'Email deve ser válido' })
    email?: string;

    @IsPhoneNumber('BR', { message: 'Telefone deve ser um número brasileiro válido' })
    phone?: string;

    @Length(2, 255, { message: 'Cargo deve ter entre 2 e 255 caracteres' })
    position?: string;

    @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida (YYYY-MM-DD)' })
    @Transform(({ value }) => {
        if (value) {
            const date = new Date(value);
            const today = new Date();
            if (date > today) {
                throw new Error('Data de nascimento não pode ser no futuro');
            }
        }
        return value;
    })
    birthDate?: string;

    @Length(10, 1000, { message: 'Mensagem deve ter entre 10 e 1000 caracteres' })
    message?: string;
}