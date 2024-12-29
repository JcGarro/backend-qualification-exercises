export class ObjectId {
  private data: Buffer;
  private static rand: number = Math.floor(Math.random() * Math.pow(2, 32));
  private static count: number = Math.floor(Math.random() * Math.pow(2, 24));

  constructor(type: number, timestamp: number) {
    /**
     * insert your code here
     */
    const uid = [type,timestamp,ObjectId.rand,ObjectId.count++]
    const numbyte = [1,6,4,3]
    const dat = []
    
    for (let r = 0; r < 4; r++){
      const bytes = []
      const byteCount = numbyte[r]
      let val = uid[r]
      for (let i = 0; i < byteCount; i++) {
        bytes.unshift(val & 0xff);
        val = val >>> 8;
      }
      //console.log(bytes)
      dat.push(Buffer.from(bytes))
    }
    //console.log(dat)
    this.data = Buffer.concat(dat)
     
  }

  static generate(type?: number): ObjectId {
    return new ObjectId(type ?? 0, Date.now());
  }
  
  toString(encoding?: 'hex' | 'base64'): string {
    return this.data.toString(encoding ?? 'hex');
  }
}