import * as R from 'ramda';
import delay from '@highoutput/delay';
import { ExecutionCache } from './';

describe('ExecutionCache', () => {
  describe('#fire', () => {
    test('execute async handler', async () => {
      const handler = jest.fn(async (a: number, b: number) => {
        await delay(Math.floor(100 * Math.random()));

        return a + b;
      });

      const cache = new ExecutionCache(handler);

      await cache.fire('key', 1, 2);

      expect(handler).toHaveBeenCalledWith(1, 2);
    });

    test('multiple unrelated executions', async () => {
      const handler = jest.fn(async (a: number, b: number) => {
        await delay(Math.floor(100 * Math.random()));
        
        return a + b;
      });

      const cache = new ExecutionCache(handler);

      for (const i of R.range(0, 10)) {
        await cache.fire(`key-${i}`, i, i);
      }

      expect(handler).toHaveBeenCalledTimes(10);
    });

    test('idempotent execution', async () => {
      const handler = jest.fn(async (a: number, b: number) => {
        await delay(Math.floor(100 * Math.random()));
        
        return a + b;
      });

      const cache = new ExecutionCache(handler);

      const results = await Promise.all(R.times(() => cache.fire('key', 4, 5), 10));

      expect(handler).toHaveBeenCalledTimes(10);
      expect(handler).toHaveBeenCalledWith(4, 5);
      expect(results).toEqual(R.repeat(9, 10));
    });
  });
});