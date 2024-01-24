import { plainToInstance } from 'class-transformer';

export const transformPlainToInstance = (ClassEntity, instance) => {
  return plainToInstance(ClassEntity, instance, { strategy: 'excludeAll' });
};
