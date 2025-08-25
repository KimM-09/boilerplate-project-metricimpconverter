'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

    app.route('/api/convert')
       .get(function(req, res) {
          let input = req.query.input;
          let initNum, initUnit, returnNum, returnUnit, string;
          let numError = null;
          let unitError = null;
          try {
            initNum = convertHandler.getNum(input);
          } catch (err) {
            numError = err;
          }
          try {
            initUnit = convertHandler.getUnit(input);
          } catch (err) {
            unitError = err;
          }
          if (numError && unitError) {
            return res.send('invalid number and unit');
          } else if (numError) {
            return res.send('invalid number');
          } else if (unitError) {
            return res.send('invalid unit');
          }
          try {
            returnNum = convertHandler.convert(initNum, initUnit);
            returnUnit = convertHandler.getReturnUnit(initUnit);
            string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
            res.json({
              initNum: initNum,
              initUnit: initUnit,
              returnNum: returnNum,
              returnUnit: returnUnit,
              string: string            
            });
          } catch (err) {
            res.send(err.message);
          }
       });
};
