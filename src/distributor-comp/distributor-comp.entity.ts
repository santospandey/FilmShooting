import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { FilmEntity } from "../film/entity/film.entity";

@Entity("distributor_company")
export class DistributorCompEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @CreateDateColumn()
    created:Date

    @OneToMany(type=>FilmEntity, film=>film.distributorCompany)
    films:FilmEntity[]
}