import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import EmployerEntity from './employer.entity';
import EmployeeEntity from './employee.entity';

@Entity()
export default class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    title: string;

    // n:1 relation with employer
    @ManyToOne(type => EmployerEntity, employer => employer.definedProjects)
    employer: EmployerEntity;

    // n:1 relation with employee
    @ManyToOne(type => EmployeeEntity, employee => employee.gotAcceptedProjects)
    employee: EmployeeEntity;

}