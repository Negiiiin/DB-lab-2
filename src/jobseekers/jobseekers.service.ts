import { Injectable } from '@nestjs/common';
import CreateEmployerDto from './dto/create-employer.dto';
import CreateEmployeeDto from './dto/create-employee.dto';
import CreateProjectDto from './dto/create-project.dto';

import EmployeeEntity from '../../db/employee.entity';
import EmployerEntity from '../../db/employer.entity';
import ProjectEntity from '../../db/project.entity';

@Injectable()
export class JobseekersService {

    async insertEmployer(employerDetails: CreateEmployerDto): Promise<EmployerEntity> {
        const employer = new EmployerEntity();
        const { name, projects } = employerDetails;

        employer.name = name;

        await EmployerEntity.save(employer);
        return employer;
    }

    async getAllEmployers(): Promise<EmployerEntity[]> {
        return await EmployerEntity.find();
    }

    async updateEmployer(employerID, updatedData: CreateEmployerDto): Promise<String> {
        const employer = await EmployerEntity.findByIds(employerID);
        const employerInfo = employer.shift();

        if ("name" in updatedData) {
            employerInfo.name = updatedData.name
        }
        if ("projects" in updatedData) {
            employerInfo.definedProjects = [];
            for (let i = 0; i < updatedData.projects.length; i++) {
                const project = await ProjectEntity.findOne(updatedData.projects[i]);
                employerInfo.definedProjects.push(project);
            }
        }

        await employerInfo.save();
        return "employer updated";
    }

    async insertEmployee(employeeDetails: CreateEmployeeDto): Promise<EmployeeEntity> {
        const employee = new EmployeeEntity();
        const { name, gotAcceptedProjects, requestedProjects } = employeeDetails;

        employee.name = name;

        employee.requestedProjects = [];

        for (let i = 0; i < requestedProjects.length; i++) {
            const project = await ProjectEntity.findOne(requestedProjects[i]);
            employee.requestedProjects.push(project);
        }

        await EmployeeEntity.save(employee);
        return employee;
    }

    async getAllEmployees(): Promise<EmployeeEntity[]> {
        return await EmployeeEntity.find();
    }

    async insertProject(projectDetails: CreateProjectDto): Promise<ProjectEntity> {
        const project = new ProjectEntity();
        const { title, employee , employer } = projectDetails;

        project.title = title;
        project.employer = await EmployerEntity.findOne(employer);

        await ProjectEntity.save(project);
        return project;
    }

    async requestForProject(employeeID, projectID): Promise<String> {
        const employee = await EmployeeEntity.findByIds(employeeID);
        const employeeInfo = employee.shift();
        const project = await ProjectEntity.findOne(projectID);
        if (employeeInfo.requestedProjects == null) {
            employeeInfo.requestedProjects = []
        }
        
        employeeInfo.requestedProjects.push(project);


        await employeeInfo.save();
        return "requested";
    }

    async assignEmployeeToProject(employeeID, projectID): Promise<String> {
        const project = await ProjectEntity.findByIds(projectID);
        const projectInfo = project.shift();

        projectInfo.employee = await EmployeeEntity.findOne(employeeID);

        await projectInfo.save();
        return "assigned";
    }

    async getAllProjects(): Promise<ProjectEntity[]> {
        return await ProjectEntity.find();
    }

    async deleteEmployer(employerID): Promise<String> {
        const employer = await EmployerEntity.findByIds(employerID);
        await EmployerEntity.remove(employer);
        return 'employer deleted successfully'
    }

    async deleteEmployee(employeeID): Promise<String> {
        const employee = await EmployeeEntity.findByIds(employeeID);
        await EmployeeEntity.remove(employee);
        return 'employee deleted successfully'
    }

    async deleteProject(projectID): Promise<String> {
        const project = await ProjectEntity.findByIds(projectID);
        await ProjectEntity.remove(project);
        return 'project deleted successfully'
    }

}
