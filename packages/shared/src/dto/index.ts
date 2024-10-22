import z from 'zod';
import { GanttType } from '@prisma/client';

export namespace AuthDTO {
  const email = z.string().email();
  const phone = z.string().regex(/^[0-9]{11}$/);
  export const codeSchema = z.string().regex(/^[0-9]{6}$/);

  export const identitySchema = z.union([email, phone]);

  export const passwordSchema = z.string().min(8).max(20);

  export const RequireCodeSchema = z.object({
    identity: identitySchema,
  });
  export type RequireCodeDto = z.infer<typeof RequireCodeSchema>;

  export const ValidateCodeSchema = z.object({
    identity: identitySchema,
    code: codeSchema,
  });
  export type ValidateCodeDto = z.infer<typeof ValidateCodeSchema>;

  export const ForgetPasswordSchema = z.object({
    identity: identitySchema,
    code: codeSchema,
    newPassword: passwordSchema,
  });
  export type ForgetPasswordDto = z.infer<typeof ForgetPasswordSchema>;

  export const ChangePasswordSchema = z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
  });
  export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;

  export const PasswordLoginSchema = z.object({
    identity: identitySchema,
    password: passwordSchema,
  });
  export type PasswordLoginDto = z.infer<typeof PasswordLoginSchema>;

  export const BindIdentitySchema = z.object({
    identity: identitySchema,
  });
  export type BindIdentityDto = z.infer<typeof BindIdentitySchema>;

  export const InitAdminSchema = z.object({
    identity: identitySchema,
    password: passwordSchema,
  });
  export type InitAdminDto = z.infer<typeof InitAdminSchema>;

  export const InitUsernameSchema = z.object({
    username: z.string().min(2).max(20),
  });
  export type InitUsernameDto = z.infer<typeof InitUsernameSchema>;

  export const InitPasswordSchema = z.object({
    password: passwordSchema,
  });
  export type InitPasswordDto = z.infer<typeof InitPasswordSchema>;
}

export namespace ChatDTO {}

export namespace OrderDTO {
  export const NewOrderSchema = z.object({
    productId: z.number(),
  });
  export type NewOrderDto = z.infer<typeof NewOrderSchema>;
}

export namespace GanttObjectDTO {
  export const NewGanttObjectSchema = z.object({
    name: z.string().min(1, {
      message: "gantt object name is required",
    }),
    id: z.string().min(1, {
      message: "gantt object id is required",
    }),
    progress: z.optional(z.number()),
    type: z.enum([GanttType.Task, GanttType.Project], {
      errorMap: (issue, ctx) => {
        return { message: `type must be one of: ${Object.values(GanttType).join(', ')}` };
      },
    }),
    hideChildren: z.optional(z.boolean()),
    displayOrder: z.number().
    code: z.optional(z.string()),
  });
  export type NewOrderDto = z.infer<typeof NewGanttObjectSchema>;
}
