import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

enum GanttType {
  Task = "Task",
  Project = "Project"
}

export class CreateGanttObjectDto {
  @ApiProperty({ description: '用户的年龄', required: false })
  name?: string

  @ApiProperty({ description: '用户的名字' })
  id: string

  @ApiProperty({ description: '用户的名字' })
  progress: number

  @ApiProperty({ description: '用户的年龄', required: false })
  type: GanttType

  @ApiProperty({ description: '用户的名字' })
  hideChildren?: boolean

  @ApiProperty({ description: '用户的名字' })
  displayOrder: number

  @ApiPropertyOptional({
    type: Number,
    isArray: true,
  })
  dependsOn?: number[]

  @ApiProperty({ description: '用户的名字' })
  start: string

  @ApiProperty({ description: '用户的名字' })
  end: string
}

export class GetGanttObjectDtoByAutoIncrementIdDto {
  @ApiProperty({ description: '甘特图自增id' })
  autoIncrementId: number
}