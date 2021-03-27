import express from 'express';
import {changePassword} from '../controller/user.js';
import {forgotPassword, resetPassword} from '../controller/auth.js'
import {ratingMentor} from '../controller/mentor.js';
import {viewListQuestionForMentor,createQuestion} from '../controller/question.js'
import {listMentorSuggestion} from '../controller/mentor.js'
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {registerMentorRequest} from '../controller/request.js';
import { protect, restrictTo} from '../controller/auth.js';
dotenv.config();

const router = express.Router();

router.post(
    '/register',
    async (req, res, next) => {
        passport.authenticate(
            'register', {session: false},
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error(info.message);
                        return next(error);
                    }
                    res.json({
                        message: 'Signup successful',
                        user: req.user
                    });
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'local-login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error(info.message);
                        return next(error);
                    }
                    req.login(
                        user,
                        {session: false},
                        async (error) => {
                            if (error) return next(error);

                            const body = {_id: user._id, username: user.username};
                            let token = "Bearer ";
                            token += jwt.sign({user: body}, process.env.SECRET_KEY).toString();

                            // return res.json({ token, user });
                            const data = {
                                _id: user._id,
                                username: user.username,
                                email: user.email,
                                fullname: user.fullname,
                                role: user.role,
                                level: user.level,
                                detail: {
                                    dob: user.detail.dob,
                                    gender: user.detail.gender,
                                    phone: user.detail.phone,
                                    address: user.detail.address,
                                    avatar: user.detail.avatar,
                                    currentJob: user.detail.currentJob,
                                    achievement: user.detail.achievement
                                }
                            }
                            return res.json({
                                user: {
                                    token: token,
                                    data
                                }
                            })
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

// auth with google+
router.get('/google', passport.authenticate('google', { scope:['profile', 'email'] }));

router.get('/google/redirect', (req, res, next) =>
    passport.authenticate('google', {
        successRedirect: 'https://app.livecoding.me',
        failureRedirect: 'https://app.livecoding.me/login'
    }, (err, user) => {

        const body = {_id: user._id, username: user.username};
        let token = "Bearer ";
        token += jwt.sign({user: body}, process.env.SECRET_KEY).toString();
        const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            level: user.level,
            detail: {
                dob: user.detail.dob,
                gender: user.detail.gender,
                phone: user.detail.phone,
                address: user.detail.address,
                avatar: user.detail.avatar,
                currentJob: user.detail.currentJob,
                achievement: user.detail.achievement
            }
        }
        console.log(data)
        res.cookie('user', JSON.stringify({
            user: {
                token,
                data
            }
        }), {domain: '.livecoding.me', secure: true})
        res.redirect('https://app.livecoding.me');
    })(req, res, next)
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/redirect', (req, res, next) =>
    passport.authenticate('facebook', {
        successRedirect: 'https://app.livecoding.me',
        failureRedirect: 'https://app.livecoding.me/login'
    }, (err, user) => {

        const body = {_id: user._id, username: user.username};
        let token = "Bearer ";
        token += jwt.sign({user: body}, process.env.SECRET_KEY).toString();
        const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            level: user.level,
            detail: {
                dob: user.detail.dob,
                gender: user.detail.gender,
                phone: user.detail.phone,
                address: user.detail.address,
                avatar: user.detail.avatar,
                currentJob: user.detail.currentJob,
                achievement: user.detail.achievement
            }
        }
        res.cookie('user', JSON.stringify({
            user: {
                token,
                data
            }
        }), {domain: '.livecoding.me', secure: true})
        res.redirect('https://app.livecoding.me');
    })(req, res, next)
);

// auth with github
router.get('/github', passport.authenticate('github', {scope: ['user:email']}));

router.get('/github/redirect', (req, res, next) =>
    passport.authenticate('github', {
        successRedirect: 'https://app.livecoding.me',
        failureRedirect: 'https://app.livecoding.me/login'
    }, (err, user) => {

        const body = {_id: user._id, username: user.username};
        let token = "Bearer ";
        token += jwt.sign({user: body}, process.env.SECRET_KEY).toString();
        const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            level: user.level,
            detail: {
                dob: user.detail.dob,
                gender: user.detail.gender,
                phone: user.detail.phone,
                address: user.detail.address,
                avatar: user.detail.avatar,
                currentJob: user.detail.currentJob,
                achievement: user.detail.achievement
            }
        }
        res.cookie('user', JSON.stringify({
            user: {
                token,
                data
            }
        }), {domain: '.livecoding.me', secure: true})
        res.redirect('https://app.livecoding.me');
    })(req, res, next)
);

router.get('/logout', (req, res) => {
    req.logOut();
    res.json({message: 'logout successful'});
})

router.post('/:id/admin', changePassword);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.post('/ratingMentor/:id',protect,restrictTo('mentee'),ratingMentor);
router.post('/registerMentorRequest',protect,restrictTo('mentee'),registerMentorRequest);
router.post('/createQuestion',protect,restrictTo('mentee'),createQuestion);
router.get('/listMentorSuggestion',protect,restrictTo('mentee'),listMentorSuggestion);
export default router;
