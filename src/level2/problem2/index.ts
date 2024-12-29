export type DowntimeLogs = [Date, Date][];

export function merge(...args: DowntimeLogs[]): DowntimeLogs {
  /**
   * insert your code here
   */
  const downs = args.flat();
  downs.sort(function(x, y) {
    return x[0].getTime() - y[0].getTime(); 
  });
  const merg : DowntimeLogs[];


  return [];
}