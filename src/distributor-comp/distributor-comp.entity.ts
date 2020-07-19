import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("distributor-company")
export class DistributorCompEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @CreateDateColumn()
    created:Date
}