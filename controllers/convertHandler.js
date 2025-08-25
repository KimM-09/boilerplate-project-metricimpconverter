function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let numRegex = /^[\d.\/]+/;
    let numMatch = input.match(numRegex);
    if (numMatch) {
      let numStr = numMatch[0];
      if (numStr.includes('/')) {
        let nums = numStr.split('/');
        if (nums.length != 2) {
          throw new Error('invalid number');
        }
        let numerator = parseFloat(nums[0]);
        let denominator = parseFloat(nums[1]);
        if (isNaN(numerator) || isNaN(denominator)) {
          throw new Error('invalid number');
        }
        result = numerator / denominator;
      } else {
        result = parseFloat(numStr);
        if (isNaN(result)) {
          throw new Error('invalid number');
        }
      }
    } else {
      result = 1; // Default to 1 if no number is provided
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/);
    if (result) {
      result = result[0].toLowerCase();
      const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      if( !validUnits.includes(result) ) {
        throw new Error('invalid unit');
      } else if (result === 'l') {
        result = 'L'; // Capitalize L for liters
      } else {
        result = result.toLowerCase(); // Ensure other units are lowercase
      } 
    } else {
      throw new Error('invalid unit');
    } 
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result  = '';
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg' : 'lbs'
    };
    if (unitMap.hasOwnProperty(initUnit)) {
      result = unitMap[initUnit];
    } else {
      throw new Error('invalid unit');
    } 
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const spellMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg' : 'kilograms'
    };
    if (spellMap.hasOwnProperty(unit)) {
      result = spellMap[unit];
    } else {
      throw new Error('invalid unit');
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    result = parseFloat(result.toFixed(5));
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} convert to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
