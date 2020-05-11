import { Application, Request, Response } from 'express';
import cookieParser = require('cookie-parser');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
var ObjectId = require('mongodb').ObjectID;
// Load input validation
//const validateRegisterInput = require("../../validation/register");
//const validateLoginInput = require("../../validation/login");
import { strongMiddleware,customMiddleware } from '../../Middleware';
import nanoid = require('nanoid');
// Load User model
const User = require("../../models/User").User;
const Booking = require("../../models/Booking").Booking;
const Reservation = require("../../models/Reservation").Reservation;
const WebSocket = require('ws');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
//const ws = new WebSocket("ws://localhost:3030");

router.post("/register",[strongMiddleware({firstname: 'string', lastname: 'string', email: 'string', userid: 'number', password: 'string',type: 'string'})],
async (req: Request, response: Response) => {
 
  User.findOne({ email: response.locals.strongParams['email'] }).then((user: any) => {
    if (user) {
      return response.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        userid: response.locals.strongParams['userid'],
        type: response.locals.strongParams['type'],
        firstname: response.locals.strongParams['firstname'],
        lastname: response.locals.strongParams['lastname'],
        email: response.locals.strongParams['email'],
        password: response.locals.strongParams['password']
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (error: any, salt: any) => {
        bcrypt.hash(newUser.password, salt, (error: any, hash: any) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then((user: any) => {
		var message = "Hello "+response.locals.strongParams['firstname']+", \n Welcome to Car Rental Portal. Login to book a car for you.\n Thanks.";
        const msg = {
          to: response.locals.strongParams['email'],
          from: 'g.n.suneela@gmail.com',
          subject: 'Welcome to Car Rental',
          text: message,
          html: message,
        };
        (async function () {
          await sgMail.send(msg);
        })().catch( e => { console.error(e);
          console.log(e.response.body)
         })
              response.json(user)})
              .catch((error: any) => console.log(error));
            });
          });
        }
      });
        
});


router.post("/login",[
        customMiddleware({requireCookie: false}),
        strongMiddleware({email: 'string', password: 'string',type:'string'})], async (req: Request, response: Response) => {
  

  const email = response.locals.strongParams['email'];
  const password = response.locals.strongParams['password'];
  const type = response.locals.strongParams['type'];

  User.findOne({type:type,email:email}).then((user: { password: any; id: any; type: any; userid: any; firstname: any; lastname: any; _id: any; }) => {
    if (!user) {
      return response.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch: any) => {
      if (isMatch) {

        const payload = {
          id: user.id,
          type: user.type,
          userid: user.userid,
          firstname: user.firstname,
          lastname: user.lastname
        };

        // Sign token
        jwt.sign(payload,keys.secretOrKey,{
            expiresIn: 900 // 15 mins in seconds
          },
          (err:any, token:any) => {
            var message = "Hello "+user.firstname+", \n You have logged into Car_rental sucessfully.\n Thanks.";
        const msg = {
          to: response.locals.strongParams['email'],
          from: 'g.n.suneela@gmail.com',
          subject: 'Welcome to Car Rental',
          text: message,
          html: message,
        };
        (async function () {
          await sgMail.send(msg);
        })().catch( e => { console.error(e);
          console.log(e.response.body)
         })
            response.json({
              user:user._id,
              success: true,
              token: "Bearer " + token
            });
          }
        );
       // req.session.userId = user._id;
      } else {
        return response
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


router.post("/booking",[customMiddleware({requireCookie: false})],async (req: Request, res: Response) => {
  const newBooking = new Booking({
    userid: req.body.userid,
    carname: req.body.carname,
    duration: req.body.duration
  });
  newBooking
        .save()
        .then((booking: any) => res.json(booking))
        .catch((err:any) => console.log(err));
});

router.get("/bookings", async (req: Request, res: Response) => {
var bookingData = Booking.find({}).then((data:any) =>{
console.log(data)
return res.status(200).json(data);
});
//console.log(bookingData);
});

router.delete("/booking", async (req: Request, res: Response) => {
const _id = new ObjectId(req.body.id);
console.log(req.body);
var bookingData = Booking.deleteOne({_id:_id}).then((data:any) =>{
return res.status(200).json(data);
});
});

router.post("/reservation",async (req: Request, res: Response) => {

const newReservation = new Reservation({
userid: req.body.userid,
price: req.body.price,
});
//const message = { name: req.body.userid, message: req.body.price };

newReservation
    .save()
    .then((reservation:any) => {
      res.json(reservation)
    })
    .catch((err:any) => console.log(err));
});

module.exports = router;
