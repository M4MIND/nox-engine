import axios from 'axios';
import { MakeDirectoryOptions } from 'fs';

export default class FileSystem {
  public static async mkdir(directory: string[], options: MakeDirectoryOptions & { recursive?: boolean } = {}) {
    const res = await axios.put('/api/file-system/directory', {
      data: {
        directory: directory,
        options: options,
      },
    });
  }

  public static async readdir(directory: string[]): Promise<string[]> {
    const res = await axios.get('/api/file-system/directory', {
      params: {
        directory: directory,
      },
    });

    return res.data;
  }

  public static async writeFile(file: string[], text: string) {
    const res = await axios.put('/api/file-system/file', {
      data: {
        file: file,
        text: text,
      },
    });
  }
}
