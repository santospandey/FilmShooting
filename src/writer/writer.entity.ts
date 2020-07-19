import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class WriterEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @CreateDateColumn()
    created:Date
}