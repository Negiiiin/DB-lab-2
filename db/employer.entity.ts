import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import ProjectEntity from './project.entity';

@Entity()
export default class EmployerEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    // 1:n relation with projectEntity 
    @OneToMany(type => ProjectEntity, definedProject => definedProject.employer)
    definedProjects: ProjectEntity[];
    
}