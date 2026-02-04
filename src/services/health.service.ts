export class HealthService {
  async getStatus() {
    return { 
      status: "ok", 
      timestamp: new Date().toISOString() 
    };
  }
}