export class ExecutionCache<TInputs extends Array<unknown>, TOutput> {
  
  private box: Map<string, Promise<TOutput>> = new Map();
  constructor(private readonly handler: (...args: TInputs) => Promise<TOutput>) {}
  
  async fire(key: string, ...args: TInputs): Promise<TOutput> {
    /**
     * insert your code here
     */
    if (this.box.has(key)) {
      
      const bProm = this.box.get(key);
      if (!bProm?.[Symbol.toStringTag]?.includes('Promise')) {
        this.box.delete(key);
      } 
      else {
        return bProm;
      }
    }

    const out = await this.handler(...args);
    this.box.set(key, Promise.resolve(out));
    return out;    
  }
}

