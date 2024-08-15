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

router.post('/messages', [middlewares.authorization, controller.user.message], services.user.message);

router.post('/updateUser', [middlewares.authorization, controller.user.updateUser], services.user.updateUser);
router.post('/updatePassword', [middlewares.authorization, controller.user.updatePassword], services.user.updatePassword);
router.post('/deleteUser', [middlewares.authorization, controller.user.deleteUser], services.user.deleteUser);
router.post('/getUserInfo', [controller.user.getUserInfo], services.user.getUserInfo);

router.post('/follow', [middlewares.authorization, controller.user.follow], services.user.follow);
router.get('/getRequests', [controller.user.getRequests], services.user.getRequests);
router.post('/acceptFollowRequest', [controller.user.acceptFollowRequest], services.user.acceptFollowRequest);
router.post('/deleteFollowRequest', [controller.user.deleteFollowRequest], services.user.deleteFollowRequest);
router.get('/getFollower', [controller.user.getFollower], services.user.getFollower);
router.get('/getFollowing', [controller.user.getFollowing], services.user.getFollowing);
router.post('/deleteFollow', [middlewares.authorization, controller.user.deleteFollow], services.user.deleteFollow);



module.exports = router;