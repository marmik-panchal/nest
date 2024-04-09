import { Module } from '@nestjs/common';
import { AppController } from '@app/app/app.controller';
import { AppService } from '@app/app/app.service';
import { AppRouterModule } from '@app/app/app.router';
import { DatabaseModule } from '@app/core/db/database.module';
import { CoreModule } from '@app/core/module';

@Module({
  imports: [CoreModule, DatabaseModule, AppRouterModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
