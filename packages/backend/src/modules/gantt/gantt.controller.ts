import * as Joi from 'joi';

import { Body, Controller, Get, Put } from '@nestjs/common';

import { Payload } from '@/common/guards/auth.guard';
import { JoiValidationPipe } from '@/common/pipes/joi';

import { GanttService } from './gantt.service';
import {ZodValidationPipe} from "@/common/pipes/zod";
import {OrderDTO} from "shared";

const nameSchema = Joi.string().min(4).max(20).required();

@Controller('user')
export class GanttController {
  constructor(private readonly ganttService: GanttService) {}

  @Get('info')
  async getInfo(@Payload('id') userId: number) {
    return {
      success: true,
      data: await this.ganttService.getInfo(userId),
    };
  }

  @Put('name')
  async createObject(
    @Payload('id') userId: number,
    @Body(new ZodValidationPipe(OrderDTO.NewOrderSchema))
      body: OrderDTO.NewOrderDto,
  ) {
    return {
      success: true,
      data: await this.ganttService.updateName(userId, name),
    };
  }
}
