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
/**
 * @summary Update album
 * @param {string} user_id.required - name param description
 * @param {Song} request.body.required - songs info
 * @return {array<Song>} 200 - success response - application/json
 */

/**
 * agencyGet defination
 * @typedef {object} AgencyGet
 * @property {string} agency_id.required
 */

/**
 * POST /agency/get
 * @summary agency get endpoint
 * @security UserAuth
 * @tags AGENCY
 * @param {AgencyGet} request.body.required - agency get body
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbiden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - Server error - application/json
 */
router.post('/get', [
    // controller.agency.get
],);//services.agency.get);

/**
 * agencyGet defination
 * @typedef {object} AgencyDelete
 * @property {string} agency_id.required
 */

/**
 * DELETE /agency/delete
 * @summary agency delete endpoint
 * @security UserAuth
 * @tags AGENCY
 * @param {AgencyDelete} request.body.required - agency delete body
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbiden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - Server error - application/json
 */
router.delete('/delete', [
    //controller.agency.delete
],);//services.agency.delete);



router.post('/follow', [middlewares.authorization, controller.follow.follow], services.follow.follow);
router.post('/acceptFollowRequest', [middlewares.authorization, controller.follow.acceptFollowRequest], services.follow.acceptFollowRequest);
router.post('/deleteFollowRequest', [middlewares.authorization, controller.follow.deleteFollowRequest], services.follow.deleteFollowRequest);
router.get('/getFollower', [controller.follow.getFollower], services.follow.getFollower);
router.get('/getFollowing', [controller.follow.getFollowing], services.follow.getFollowing);
router.post('/deleteFollow', [middlewares.authorization, controller.follow.deleteFollow], services.follow.deleteFollow);
router.post('/deleteFollower', middlewares.authorization, [middlewares.authorization, controller.follow.deleteFollower], services.follow.deleteFollower);
router.get('/getRequests', [controller.follow.getRequests], services.follow.getRequests);


module.exports = router;