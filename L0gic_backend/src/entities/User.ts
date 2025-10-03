import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsDateString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @Length(2, 255, { message: 'Nome deve ter entre 2 e 255 caracteres' })
    name!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    @IsEmail({}, { message: 'Email deve ser válido' })
    @IsNotEmpty({ message: 'Email é obrigatório' })
    email!: string;

    @Column({ type: 'varchar', length: 20 })
    @IsPhoneNumber('BR', { message: 'Telefone deve ser um número brasileiro válido' })
    @IsNotEmpty({ message: 'Telefone é obrigatório' })
    phone!: string;

    @Column({ type: 'varchar', length: 255 })
    @IsNotEmpty({ message: 'Cargo é obrigatório' })
    @Length(2, 255, { message: 'Cargo deve ter entre 2 e 255 caracteres' })
    position!: string;

    @Column({ type: 'date' })
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

    @Column({ type: 'text' })
    @IsNotEmpty({ message: 'Mensagem é obrigatória' })
    @Length(10, 1000, { message: 'Mensagem deve ter entre 10 e 1000 caracteres' })
    message!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}