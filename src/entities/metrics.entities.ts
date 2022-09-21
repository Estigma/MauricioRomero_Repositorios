import { Repository } from './repository.entities'
import {
    Column,
    Entity,
    BaseEntity,
    JoinColumn,
    OneToOne,
    PrimaryColumn
} from 'typeorm'
import { type } from 'os';

@Entity("metrics")
export class Metrics extends BaseEntity {

    @OneToOne(type => Repository)
    @JoinColumn({
        name: 'id_repository',
        referencedColumnName: 'id_repository'
    })
    repository: Repository;

    @PrimaryColumn()
    id_repository: number

    @Column()
    coverage: number

    @Column()
    vulnerabilities: number

    @Column()
    hotspot: number

    @Column()
    code_smells: number
}
