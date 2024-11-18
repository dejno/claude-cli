// Update src/utils/rateLimiter.ts to add token counting
export class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private readonly maxTokens: number;
  private readonly refillInterval: number;

  constructor(maxTokens: number, refillInterval: number) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.refillInterval = refillInterval;
    this.lastRefill = Date.now();
  }

  private refill() {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const refillAmount = Math.floor(timePassed / this.refillInterval) * this.maxTokens;
    this.tokens = Math.min(this.maxTokens, this.tokens + refillAmount);
    this.lastRefill = now;
  }

  async acquireToken(): Promise<void> {
    this.refill();
    if (this.tokens <= 0) {
      const waitTime = this.refillInterval - (Date.now() - this.lastRefill);
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
    }
    this.tokens--;
  }

  getAvailableTokens(): number {
    this.refill();
    return this.tokens;
  }
}