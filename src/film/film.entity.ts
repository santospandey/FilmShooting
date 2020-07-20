import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ProductionCompEntity } from "../production-comp/production-comp.entity";
import { DistributorCompEntity } from "src/distributor-comp/distributor-comp.entity";
import { DirectorEntity } from "src/director/director.entity";
import { WriterEntity } from "src/writer/writer.entity";
import { ActorEntity } from "src/actor/actor.entity";

@Entity("film")
export class FilmEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    title:string;

    @Column()
    release_date:Date

    @CreateDateColumn()
    created:Date

    @ManyToOne(type=>ProductionCompEntity, productionCompany=>productionCompany.films)
    productionCompany:ProductionCompEntity

    @ManyToOne(type=>DistributorCompEntity, distributorCompany=>distributorCompany.films)
    distributorCompany:DistributorCompEntity

    @ManyToMany(type=>DirectorEntity)
    @JoinTable()
    directors:DirectorEntity[];

    @ManyToMany(type=>WriterEntity)
    @JoinTable()
    writers:WriterEntity[]

    @ManyToMany(type=>ActorEntity)
    @JoinTable()
    actors:ActorEntity[]
}