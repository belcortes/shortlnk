import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users'
import { Links } from '../imports/api/links'
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1)
    const link = Links.findOne({ _id })

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
    } else {
      next();
    }
    
  })

  

  // How to use Simpl Schema package
  // const petSchema = new SimpleSchema({
  // 	name: {
  // 		type: String,
  // 		min: 1,
  // 		max: 200,
  // 		optional: true
  // 	},
  // 	age: {
  // 		type: Number,
  // 		min: 0
  // 	},
  // 	contactNumber: {
  // 		type: String,
  // 		optional: true,
  // 		regEx: SimpleSchema.RegEx.Phone
  // 	}
  // });

  // petSchema.validate({
  // 	name: 'Rex',
  // 	age: 21,
  // 	contactNumber: '1234'
  // });


  // const EmployeeSchema = new SimpleSchema({
  // 	name: {
  // 		type: String,
  // 		min: 1,
  // 		max: 200
  // 	},
  // 	hourlyWage: {
  // 		type: Number,
  // 		min: 0
  // 	}, 
  // 	email: {
  // 		type: String,
  // 		regEx: SimpleSchema.RegEx.Email
  // 	}
  // })

  // EmployeeSchema.validate({
  // 	name: 'Bel',
  // 	hourlyWage: 400,
  // 	email: 'bel@gmail.com'
  // })
});
