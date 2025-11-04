import {z} from 'zod';

export const TelephoneSchema = z.object({
  number: z.string().regex(/^\d{9}$/, 'Número deve conter exatamente 9 dígitos'),
  area_code: z.string().min(1, 'DDD obrigatório'),
});

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  telephones: z.array(TelephoneSchema, 'Deve ter ao menos um telefone').min(1),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;