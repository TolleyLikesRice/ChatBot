'use strict';
var Integer = module.exports = require('bindings')({
	bindings: 'integer.node',
	module_root: __dirname
}).Integer;


defineStatic('MAX_VALUE', Integer.fromBits(-1, 0x7fffffff));
defineStatic('MIN_VALUE', Integer.fromBits(0, -0x80000000));
defineStatic('ZERO', Integer.fromBits(0, 0));
defineStatic('ONE', Integer.fromBits(1, 0));
defineStatic('NEG_ONE', Integer.fromBits(-1, -1));

function defineStatic(key, value) {
	if (Integer.hasOwnProperty(key)) return;
	Object.defineProperty(Integer, key, {
		writable: false,
		enumerable: true,
		configurable: false,
		value: value
	});
}

function alias(methodName, aliases) {
	var method = Integer.prototype[methodName];
	if (typeof method !== 'function') throw new TypeError('Missing method');
	aliases.forEach(function (name) {Integer.prototype[name] = method;});
}

alias('add', ['plus']);
alias('subtract', ['minus', 'sub']);
alias('multiply', ['times', 'mul']);
alias('divide', ['divideBy', 'dividedBy', 'div', 'over']);
alias('modulo', ['mod']);
alias('negate', ['neg']);
alias('abs', ['absoluteValue']);
alias('shiftLeft', ['shl']);
alias('shiftRight', ['shr']);
alias('equals', ['eq', 'isEqualTo']);
alias('notEquals', ['neq', 'isNotEqualTo', 'doesNotEqual']);
alias('greaterThan', ['gt', 'isGreaterThan']);
alias('greaterThanOrEquals', ['gte', 'isGreaterThanOrEqualTo']);
alias('lessThan', ['lt', 'isLessThan']);
alias('lessThanOrEquals', ['lte', 'isLessThanOrEqualTo']);
alias('isNonZero', ['isNotZero']);
alias('valueOf', ['toNumber']);
