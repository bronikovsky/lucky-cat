import express from 'express';
import fileUpload from 'express-fileupload';

const router = express.Router();

router.use(fileUpload());
router.post('/', (req) => {
  const files = req.files;

  console.log(files);
})

export default router;
