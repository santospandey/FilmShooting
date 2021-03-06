import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from "typeorm";

@Entity("actor")
export class ActorEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()    
    first_name:string;

    @Column()    
    last_name:string;

    @CreateDateColumn()
    created:Date
}