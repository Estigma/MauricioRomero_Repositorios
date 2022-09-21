import { Tribe } from './tribe.entities'
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
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

    @Column()
    name: string

    @Column()
    state: string

    @CreateDateColumn()
    create_time: Date

    @Column()
    status: string
}
