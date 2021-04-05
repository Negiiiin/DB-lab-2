import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import ProjectEntity from './project.entity';

@Entity()
export default class EmployeeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    // 1:n relation with project  - each project has one accepted employee
    @OneToMany(type => ProjectEntity, acceptedProject => acceptedProject.employee)
    gotAcceptedProjects: ProjectEntity[];

    // n:n relation with projects   - each user can request for many projects
    @ManyToMany(type => ProjectEntity)
    @JoinTable()
    requestedProjects: ProjectEntity[];
}