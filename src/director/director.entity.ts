import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("director")
export class DirectorEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @CreateDateColumn()
    created: Date;
}