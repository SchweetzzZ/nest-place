import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: keyof any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user
        return data ? user[data] : user
    }
);
////como usar:
/*@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)

@Roles(Role.ADMIN)
@Permissions(Permission.CREATE_PRODUCT)

@Post()
createProduct(@CurrentUser() user) {
  return this.service.create();
}*/