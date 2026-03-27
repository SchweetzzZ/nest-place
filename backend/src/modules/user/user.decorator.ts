import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type CurrentUser = {
    id: string
    email: string
    name: string
    role: string

export const User = createParamDecorator(
    (data: keyof CurrentUser, ctx: ExecutionContext) => {
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
