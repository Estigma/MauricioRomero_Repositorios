import { Repository } from './repository.entities'
import {
    Column,
    Entity,
    BaseEntity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    Double
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

    @PrimaryColumn({ nullable: false })
    id_repository: number

    @Column({ nullable: false })
    bugs: number

    @Column({ nullable: false })
    coverage: number

    @Column({ nullable: false })
    vulnerabilities: number

    @Column({ nullable: false })
    hotspot: number

    @Column({ nullable: false })
    code_smells: number
}
