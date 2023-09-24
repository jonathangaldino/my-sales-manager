import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const defaultErrorSchema = (
  exampleMessage: string,
): SchemaObject & Partial<ReferenceObject> => ({
  type: 'object',
  properties: {
    message: {
      type: 'String',
      example: exampleMessage,
    },
  },
});
