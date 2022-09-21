import { Tribe } from './tribe.entities'
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany
} from 'typeorm'


@Entity("organization")
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_organization: number

    @Column()
    name: string

    @Column()
    status: number

    @OneToMany(() => Tribe, (tribe) => tribe.organization)
    tribes: Tribe[];
}
