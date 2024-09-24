import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
// import { SkipThrottle, Throttle } from '@nestjs/throttler';

// @SkipThrottle() to skip throttle for whole class
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // @SkipThrottle({default:true}) to skip for just this method
  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  // @Throttle({ short: { limit: 2, ttl: 60 } }) to set throttle for just this method and bypass the default
  @Get()
  findAll(
    @Query('role') role?: 'admin' | 'guest' | 'user',
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.employeesService.findAll(role, limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
