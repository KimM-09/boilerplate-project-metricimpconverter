const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    //1
    test('ConvertHandler should correctly read a whole number input', function() {
        let input = '3kg';
        let expected = { value: 3, unit: 'kg' };
        let result = convertHandler.getNum(input);
        assert.equal(result, expected.value);
        assert.equal(convertHandler.getUnit(input), expected.unit);
    });
    //2
    test('ConvertHandler should correctly read a decimal input', function() {
        let input = '3.5kg';
        let expected = { value: 3.5, unit: 'kg' };
        let result = convertHandler.getNum(input);
        assert.equal(result, expected.value);
        assert.equal(convertHandler.getUnit(input), expected.unit);
    })
    //3
    test('ConvertHandler should correctly read a fraction input', function() {
        let input = '1/2kg';
        let expected = { value: 0.5, unit: 'kg' };
        let result = convertHandler.getNum(input);
        assert.equal(result, expected.value);
        assert.equal(convertHandler.getUnit(input), expected.unit);
    })
    //4
    test('ConvertHandler should correctly read a fraction input with a decimal', function() {
        let input = '1.5/2kg';
        let expected = { value: 0.75, unit: 'kg' };
        let result = convertHandler.getNum(input);
        assert.equal(result, expected.value);
        assert.equal(convertHandler.getUnit(input), expected.unit);
    })
    //5
    test('ConvertHandler should correctly return an error on a double-fraction input', function() {
        let input = '1/2/3kg';
        assert.throws(() => convertHandler.getNum(input), Error, 'invalid number');
    })
    //6
    test('ConvertHandler should correctly default to 1 when no numerical input is provided', function() {
        let input = 'kg';
        let expected = { value: 1, unit: 'kg' };
        let result = convertHandler.getNum(input);
        assert.equal(result, expected.value);
        assert.equal(convertHandler.getUnit(input), expected.unit);
    })
    //7
    test('ConvertHandler should correctly read a unit input', function() {
        let input = '3kg';
        let expected = 'kg';
        let result = convertHandler.getUnit(input);
        assert.equal(result, expected);
    })
    //8
    test('ConvertHandler should correctly return an error for an invalid unit', function() {
        let input = '3xyz';
        assert.throws(() => convertHandler.getUnit(input), Error, 'invalid unit');
    })
    //9
    test('ConvertHandler should return the correct return unit for each valid unit', function() {
        let units = {
            'gal': 'L',
            'L': 'gal',
            'lbs': 'kg',
            'kg': 'lbs',
            'mi': 'km',
            'km': 'mi'
        }
        for (let unit in units) {
            let result = convertHandler.getReturnUnit(unit);
            assert.equal(result, units[unit], `Expected return unit for ${unit} to be ${units[unit]}`);
        }
    })
    //10
    test('ConverHandler should correctly return the spelled-out string for each valid unit', function() {
        let units = {
            'gal': 'gallons',
            'L': 'liters',
            'lbs': 'pounds',
            'kg': 'kilograms',
            'mi': 'miles',
            'km': 'kilometers'
        };
        for (let unit in units) {
            let result = convertHandler.spellOutUnit(unit);
            assert.equal(result, units[unit], `Expected spelled-out unit for ${unit} to be ${units[unit]}`);
        }
    })
    //11
    test('ConvertHandler should correctly convert gal to L', function() {
        let inputNum = 1;
        let inputUnit = 'gal';
        let expected = 3.78541;
        let result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Conversion from gal to L failed');
    })
    //12
    test('ConvertHandler should correctly convert L to gal', function() {
        let inputNum = 1;
        let inputUnit = 'L';
        let expected = 0.264172;
        let result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Conversion from L to gal failed');
    })
    //13
    test('ConvertHandler should correctly convert lbs to kg', function() {
        let inputNum = 1;
        let inputUnit = 'lbs';
        let expected = 0.453592;
        let result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Conversion from lbs to kg failed');
    })
    //14
    test('ConvertHandler should correctly convert kg to lbs', function() {
        let inputNum = 1;
        let inputUnit = 'kg';
        let expected = 2.20462;
        let result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Conversion from kg to lbs failed');
    })
    //15
    test('ConvertHandler should correctly convert mi to km', function() {
        let inputNum = 1;
        let inputUnit = 'mi';
        let expected = 1.60934;
        let result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Conversion from mi to kn failed');
    })
    //16
    test('ConvertHandler should correctly convert km to mi', function() {
        let inputNum = 1;
        let inputUnit = 'km';
        let expected = 0.621371;
        let result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Conversion fro km to mi failed');
    })
});