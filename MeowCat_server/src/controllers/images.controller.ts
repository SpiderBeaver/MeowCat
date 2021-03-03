import express from 'express';
import path from 'path';

const imagesController = {
  upload: async (req: express.Request, res: express.Response) => {
    return res.send({ filename: req.file.filename });
  },

  getImage: async (req: express.Request, res: express.Response) => {
    // TODO: Create folder if does not exist.
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../uploads/images', filename);
    res.sendFile(imagePath);
  },
};

export default imagesController;
