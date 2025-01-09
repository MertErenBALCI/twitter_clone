const express = require('express');
const router = express.Router();

const services = require('../../services');
const controller = require('../../controller');

const middlewares = require('../../middlewares');

/**
 * GET /int/health-check
 * @summary healt-check endpoint
 * @tags INT
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbiden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - Server error - application/json
 */

router.post('/login', [
    controller.user.login
], services.user.login);


router.post('/register', [controller.user.register], services.user.register);
router.post('/updateUser', [middlewares.authorization, controller.user.updateUser], services.user.updateUser);
router.post('/updatePassword', [middlewares.authorization, controller.user.updatePassword], services.user.updatePassword);
router.post('/deleteUser', [middlewares.authorization, controller.user.deleteUser], services.user.deleteUser);
router.get('/getUserInfo', [middlewares.authorization, controller.user.getUserInfo], services.user.getUserInfo);
router.post('/postSearch', [controller.user.postSearch], services.user.postSearch);
router.post('/postBlock', [middlewares.authorization, controller.user.postBlock], services.user.postBlock);
router.post('/deleteBlock', [middlewares.authorization, controller.user.deleteBlock], services.user.deleteBlock);
router.post('/getBlocked', [controller.user.getBlocked], services.user.getBlocked);



module.exports = router;