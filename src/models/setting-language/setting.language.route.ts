import { validate } from '@/middlewares/validate';
import { Router } from 'express';
import { settingLanguageValidate ,updatesettingLanguageValidate} from './setting.language.validate';
import { SettingLanguageController } from './setting.language.controller';
import { isVerifyAdmin } from '@/middlewares/verifyToken';
const router = Router();

router.post(
    '/',
    isVerifyAdmin,
    validate(settingLanguageValidate.settingLanguageSchemaValidation),
    SettingLanguageController.postLanguage,
);
router.get('/site', SettingLanguageController.getLanguagesByPublic);
router.get(
    '/',
    isVerifyAdmin,
    SettingLanguageController.getLanguagesByAdmin,
);

router.put(
    '/',
    isVerifyAdmin,
    validate(updatesettingLanguageValidate.updatesettingLanguageSchemaValidation),
    SettingLanguageController.updateLanage,
);

router.delete(
    '/',
    isVerifyAdmin,
    SettingLanguageController.deleteLanguageSetting,
);

export const languageRoutes: Router = router;