import { MakeDirectoryOptions } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import FS from '../../../backend/utils/FS';

const GetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.directory) {
    return res.status(404).json({
      status: 404,
    });
  }

  return res.status(200).json(await FS.readdir(req.query.directory as string));
};

const PutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: {
    directory: string[];
    options: MakeDirectoryOptions & { recursive?: boolean };
  } = req.body.data;

  return res.status(200).json(await FS.mkdir(path.join(...data.directory), data.options));
};

const directory = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return GetRequest(req, res);
  }

  if (req.method === 'PUT') {
    return PutRequest(req, res);
  }
};

export default directory;
