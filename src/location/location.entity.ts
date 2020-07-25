import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, OneToMany } from "typeorm";

@Entity("location")
export class LocationEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @Column()
    latitude:string;

    @Column()
    longitude:string;

    @CreateDateColumn()
    created:Date
}