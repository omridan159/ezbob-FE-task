import express from 'express';
import { searchController } from '../../modules/search';

const router = express.Router();

router.get('/', searchController.search);
router.get('/autocomplete', searchController.getSuggestions);

export default router;
