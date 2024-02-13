import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ClassTransformOptions } from 'class-transformer/types/interfaces';

export function transform<T, V>(
  transformer: ClassConstructor<T>,
  plain: V[],
  options?: ClassTransformOptions
): T[];

export function transform<T, V>(
  transformer: ClassConstructor<T>,
  plain: V,
  options?: ClassTransformOptions
): T;

export function transform<T, V>(
  transformer: ClassConstructor<T>,
  data: V | V[]
): T | T[] {
  return plainToInstance(transformer, data, {
    strategy: 'excludeAll',
  });
}
