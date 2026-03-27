export const Permissions = {
    PRODUCT: {
        CREATE: 'create:product',
        READ: 'read:product',
        UPDATE: 'update:product',
        DELETE: 'delete:product',
    },
    SERVICOS: {
        CREATE: 'create:servicos',
        READ: 'read:servicos',
        UPDATE: 'update:servicos',
        DELETE: 'delete:servicos',
    },
    CATEGORY: {
        CREATE: 'create:category',
        READ: 'read:category',
        UPDATE: 'update:category',
        DELETE: 'delete:category',
    }
} as const