import { CustomPrismaService } from 'nestjs-prisma';

import { Inject, Injectable } from '@nestjs/common';

import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';
import {BizException} from "@/common/exceptions/biz.exception";
import {ErrorCodeEnum, Role} from "shared";
import { GanttType } from '@prisma/client';

@Injectable()
export class GanttService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  /* 获取用户信息 */
  async getInfo(autoIncrementId: number) {
    const ganttObject = await this.prisma.client.ganttObject.findUnique({
      where: {
        autoIncrementId: autoIncrementId,
      },
    });
  }

  async create(
    name: string,
    id: string,
    progress: number,
    type: GanttType,
    hideChildren: boolean,
    displayOrder: number,
    dependencies: number[],
    dependents: number[],
    start: string,
    end: string,) {
    await this.prisma.client.ganttObject.create({
      data: {
        name,
        id,
        progress,
        type,
        hideChildren,
        displayOrder,
        dependencies: {
          create: dependencies.map(id => ({
            depends: {
              connect: { id: id }
            },
          }))
        },
        start,
        end,
      },
    });
  }
}
