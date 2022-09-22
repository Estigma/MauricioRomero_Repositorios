import { Tribe } from './tribe.entities'
import { Metrics } from './metrics.entities'
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm'


@Entity("repository")
export class Repository extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_repository: number

    @ManyToOne(() => Tribe, (tribe) => tribe.repositories)
    @JoinColumn({
        name: 'id_tribe',
        referencedColumnName: 'id_tribe'
    })
    tribe: Tribe;

    @Column({
        length: 50,
        nullable: false
    })
    name: string

    @Column({
        length: 1,
        nullable: false
    })
    state: string

    @CreateDateColumn()
    create_time: Date

    @Column({
        length: 1,
        nullable: false
    })
    status: string

    @OneToOne(type => Metrics)
    @JoinColumn({
        name: 'id_repository',
        referencedColumnName: 'id_repository'
    })
    metrics: Metrics;
}
