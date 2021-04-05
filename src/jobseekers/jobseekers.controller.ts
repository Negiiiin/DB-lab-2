import { Controller, Post, Get, Body, Delete, Param, Put } from '@nestjs/common';
import { JobseekersService } from './jobseekers.service';
import CreateEmployerDto from './dto/create-employer.dto';
import CreateEmployeeDto from './dto/create-employee.dto';
import CreateProjectDto from './dto/create-project.dto';

@Controller('jobseekers')
export class JobseekersController {
    constructor(private readonly jobseekersService: JobseekersService) { }

    @Post('insertemployer')
    postEmployer(@Body() employer: CreateEmployerDto) {
        return this.jobseekersService.insertEmployer(employer);
    }
    @Get('employer')
    getAllEmployer() {
        return this.jobseekersService.getAllEmployers();
    }

    @Post('insertemployee')
    postEmployee(@Body() employee: CreateEmployeeDto) {
        return this.jobseekersService.insertEmployee(employee);
    }

    @Get('employee')
    getAllEmployee() {
        return this.jobseekersService.getAllEmployees();
    }

    @Post('insertproject')
    postproject(@Body() project: CreateProjectDto) {
        return this.jobseekersService.insertProject(project);
    }

    @Get('project')
    getAllproject() {
        return this.jobseekersService.getAllProjects();
    }

    @Delete('deletemployer/:employerID')
    deleteEmployer(@Param('employerID') employerID: Number) {
        return this.jobseekersService.deleteEmployer(employerID);
    }

    @Delete('deletemployee/:employeeID')
    deleteEmployee(@Param('employeeID') employeeID: Number) {
        return this.jobseekersService.deleteEmployee(employeeID);
    }

    @Delete('deleteproject/:projectID')
    deleteProject(@Param('projectID') projectID: Number) {
        return this.jobseekersService.deleteProject(projectID);
    }

    @Put('request/:employeeID/:projectID')
    requestForProject(@Param('employeeID') employeeID: Number, @Param('projectID') projectID: Number) {
        return this.jobseekersService.requestForProject(employeeID, projectID);
    }

    @Put('assign/:employeeID/:projectID')
    rassignProject(@Param('employeeID') employeeID: Number, @Param('projectID') projectID: Number) {
        return this.jobseekersService.assignEmployeeToProject(employeeID, projectID);
    }
}
