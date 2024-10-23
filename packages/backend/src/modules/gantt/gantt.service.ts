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
      include: {
        dependsOn: {
          select: {
            dependsOn: {
              select: {
                id: true
              }
            }
          }
        }
      }
    });
  }

  async create(
    name: string,
    id: string,
    progress: number,
    type: GanttType,
    hideChildren: boolean,
    displayOrder: number,
    dependsOnIds: number[],
    dependedOn: number[],
    start: string,
    end: string,) {
    // await this.prisma.client.ganttObject.create({
    //   data: {
    //     name,
    //     id,
    //     progress,
    //     type,
    //     hideChildren,
    //     displayOrder,
    //     dependsOn: {
    //       create: dependsOn.map(id => ({
    //         depends: {
    //           connect: {
    //             dependsOnId: id,
    //             dependedOnId:
    //           }
    //         },
    //       }))
    //     },
    //     start,
    //     end,
    //   },
    // });
    const result = await this.prisma.client.$transaction(async (prisma) => {
      // Step 1: 先创建 GanttObject
      const createdGanttObject = await prisma.ganttObject.create({
        data: {
          name,
          id,
          progress,
          type,
          hideChildren,
          displayOrder,
          start,
          end,
        }
      });

      // Step 2: 创建 Depends，dependsOnIds 是你传入的上层 ID 数组
      const dependsData = dependsOnIds.map((dependsOnId) => ({
        dependsOnId: dependsOnId,               // 数组中的 dependsOnId
        dependedOnId: createdGanttObject.autoIncrementId, // 刚刚创建的 GanttObject 的 autoIncrementId
      }));

      // Step 3: 批量创建 Depends 记录
      const createdDepends = await prisma.depends.createMany({
        data: dependsData,
      });

      return { createdGanttObject, createdDepends };
    });

    return result;
  }
}
