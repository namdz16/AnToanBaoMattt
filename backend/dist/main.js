"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://10.20.122.187:3000', 'http://localhost:3000'],
        credentials: true,
    });
    const port = process.env.PORT || 9000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Server is running on http://localhost:${port}/graphql`);
}
bootstrap();
//# sourceMappingURL=main.js.map