// app.module.ts
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { LatestModule } from './latest/latest.module';
import { TextModule } from './text/text.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './authentication/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtMiddleware } from './middleware/token.middleware';
import { MiddlewareModule } from '@nestjs/core/middleware/middleware-module';
import { userProviders } from './user/user.providers';

@Module({
  imports: [
    // static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveStaticOptions: { index: false },
    }),
    // rate limiting
    ThrottlerModule.forRoot([
      {
        limit: 10,
        ttl: 60000,
      },
    ]),
    MiddlewareModule,
    DatabaseModule,
    UserModule,
    LatestModule,
    TextModule,
    AuthModule,
  ],
  providers: [JwtService, ...userProviders],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: '/users/profile', method: RequestMethod.PUT },
        { path: '/posts', method: RequestMethod.POST },
        { path: '/posts/:post_id', method: RequestMethod.DELETE },
        { path: '/posts/:post_id', method: RequestMethod.PUT },
        { path: '/posts/:post_id/likes', method: RequestMethod.POST },
        { path: '/posts/:post_id/likes', method: RequestMethod.DELETE },
      );
  }
}
