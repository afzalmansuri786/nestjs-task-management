"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_module_1 = require("./tasks/tasks.module");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./tasks/task.entity");
const auth_module_1 = require("./auth/auth.module");
const user_entity_1 = require("./auth/user.entity");
const config_1 = require("@nestjs/config");
const config_schema_1 = require("./config.schema");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [`${process.env.MODE}.env`],
                validationSchema: config_schema_1.configValidationSchema,
            }),
            tasks_module_1.TasksModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const isProduction = configService.get('STAGE') === 'prod';
                    return {
                        ssl: isProduction,
                        extra: {
                            ssl: isProduction ? { rejectUnauthorized: false } : null,
                        },
                        type: 'postgres',
                        host: configService.get('DB_HOST', { infer: true }),
                        port: configService.get('DB_PORT', { infer: true }),
                        username: configService.get('DB_USERNAME', { infer: true }),
                        password: configService.get('DB_PASSWORD', { infer: true }),
                        database: configService.get('DB_DATABASE', { infer: true }),
                        entities: [task_entity_1.Task, user_entity_1.User],
                        autoLoadEntities: true,
                        synchronize: true,
                    };
                },
            }),
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map