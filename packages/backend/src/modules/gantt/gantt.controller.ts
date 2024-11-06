import * as Joi from 'joi';

import { Body, Controller, Get, Put } from '@nestjs/common';

import { Payload } from '@/common/guards/auth.guard';
import { JoiValidationPipe } from '@/common/pipes/joi';

import { GanttService } from './gantt.service';
import { ZodValidationPipe } from "@/common/pipes/zod";
import {GanttObjectDTO, OrderDTO} from "shared";

import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import {CreateGanttObjectDto} from "@/modules/gantt/gantt.dto";

const nameSchema = Joi.string().min(4).max(20).required();

@ApiTags('Gantt - 甘特图模块')
@Controller('gantt')
export class GanttController {
  constructor(private readonly ganttService: GanttService) {}

  @Get('info')
  @ApiOperation({ summary: '获取甘特图对象' })
  async getInfo(@Payload('id') userId: number) {
    return {
      success: true,
      data: await this.ganttService.getInfo(userId),
    };
  }

  @Put('name')
  @ApiOperation({ summary: '添加甘特图对象' })
  @ApiBearerAuth('auth')
  async createObject(
    @Payload('id') userId: number,
    @Body(new ZodValidationPipe(GanttObjectDTO.NewGanttObjectSchema))
      body: CreateGanttObjectDto,
  ) {
    const gantt = await this.ganttService.create(
      body.name,
      body.id,
      body.progress,
      body.type,
      body.hideChildren,
      body.displayOrder,
      body.dependsOn,
      body.start,
      body.end,
    );
    return {
      success: true,
      data: {
        ganttObject: gantt.createdGanttObject,
        depends: gantt.createdDepends,
      },
    };
  }
}
