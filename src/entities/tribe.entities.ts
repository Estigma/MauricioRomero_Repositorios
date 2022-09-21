import { Organization } from './organization.entities'
import { Repository } from './repository.entities'
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'

@Entity("tribe")
export class Tribe extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_tribe: number

    @ManyToOne(() => Organization, (organization) => organization.tribes)
    @JoinColumn({
        name: 'id_organization',
        referencedColumnName: 'id_organization'
    })
    organization: Organization;

    @Column({
        length: 50,
        nullable: false
    })
    name: string

    @Column({ nullable: false })
    status: number

    @OneToMany(() => Repository, (repository) => repository.tribe)
    repositories: Repository[];
}
