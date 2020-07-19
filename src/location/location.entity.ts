import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from "typeorm";

@Entity()
export class LocationEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @CreateDateColumn()
    created:Date
}