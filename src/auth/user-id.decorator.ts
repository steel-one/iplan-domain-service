import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type TUserId = string;

export const UserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): TUserId => {
    return context.switchToRpc().getContext().userId;
  },
);
