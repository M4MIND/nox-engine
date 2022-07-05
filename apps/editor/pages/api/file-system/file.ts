import FS from '../../../backend/utils/FS';
import { NextApiRequest, NextApiResponse } from 'next';

const PutFile = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json(await FS.writeFile(req.body.data.file, req.body.data.text));
};

const file = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    return await PutFile(req, res);
  }
};

export default file;
