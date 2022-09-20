import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity("organization")
export class Organization extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_organization: number

    @Column()
    name: string

    @Column()
    status: number
}
