import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the API!';
  }

  getHealthStatus(): { status: string; timestamp: string } {
    return {
      status: 'Healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
