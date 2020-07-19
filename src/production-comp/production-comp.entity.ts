import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("production-company")
export class ProductionCompEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @CreateDateColumn()
    created:Date
}