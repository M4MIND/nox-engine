import { MakeDirectoryOptions, PathLike } from 'fs';
import * as fs from 'fs';
import path from 'path';

export default class FS {
  public static async readdir(dir: PathLike): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path.join(process.cwd(), dir as string), (err, status) => {
        if (err) {
          return reject(err);
        }

        resolve(status);
      });
    });
  }

  public static async mkdir(dir: string, options: MakeDirectoryOptions & { recursive?: boolean } = {}) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path.join(process.cwd(), dir as string), options, (err, status) => {
        if (err) {
          return reject(err);
        }

        resolve(status);
      });
    });
  }

  public static async writeFile(file: string[], data: string): Promise<{ status: string }> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(process.cwd(), ...file), data, (err) => {
        if (err) {
          return reject(err);
        }

        resolve({
          status: 'done',
        });
      });
    });
  }
}
