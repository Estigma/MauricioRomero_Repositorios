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

    @Column()
    name: string

    @Column()
    status: number

    @OneToMany(() => Repository, (repository) => repository.tribe)
    repositories: Repository[];
}
