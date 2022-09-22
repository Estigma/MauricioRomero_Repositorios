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

    @Column({
        length: 50,
        nullable: false
    })
    name: string

    @Column({ nullable: false })
    status: number

    @OneToMany(() => Tribe, (tribe) => tribe.organization)
    tribes: Tribe[];
}
