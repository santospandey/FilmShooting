import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { FilmEntity } from "src/film/film.entity";

@Entity("production_company")
export class ProductionCompEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @CreateDateColumn()
    created:Date

    @OneToMany(type=>FilmEntity, film=>film.productionCompany)
    films:FilmEntity[]
}