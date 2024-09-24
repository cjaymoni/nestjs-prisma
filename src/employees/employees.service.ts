import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({ data: createEmployeeDto });
  }

  async findAll(
    role?: 'admin' | 'guest' | 'user',
    limit?: number,
    offset?: number,
  ) {
    if (role) {
      const employees = this.databaseService.employee.findMany({
        where: { role },
      });
      if (!(await employees).length) {
        throw new NotFoundException(`No employee with role ${role}`);
      }
    } else if (limit || offset) {
      return this.databaseService.employee.findMany({
        take: limit,
        skip: offset,
      });
    }
    return this.databaseService.employee.findMany();
  }
  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: { id },
    });
  }
}
