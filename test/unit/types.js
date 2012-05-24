#! /usr/bin/env node

var nodeunit = require('nodeunit')
var assert = require('assert')
var uglify = require('../../uglify-js')
var typeCheck = require('../../lib/type-check')

var tests = {}

function addTest(code, expectedError) {
        tests[code] = function(test) {
                var ast = uglify.parser.parse(code)
                if (expectedError) {
                        var error = null
                        try { typeCheck(ast) }
                        catch(e) { error = e }
                        assert.deepEquals(expectedError, error)
                } else {
                        typeCheck(ast)
                }
                test.done()
        }
}

addTest('function foo(qwe : String, cat : Number) {}')
addTest('function foo(qwe : String, cat : Number) {}; foo(1, 2)')

module.exports = nodeunit.testCase(tests)
