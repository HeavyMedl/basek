function BasekConstructor() {
	this._rep = '';
	this._E = this.alphaDefault();
	predefined = [2,6,8,16,36,62]; 
	predefined.forEach(function(base){
		this.makeTag(10,base)
	},this);
}
function Basek() {
	return new BasekConstructor();
}
BasekConstructor.prototype = {
	alpha : function() {
		return this._E;
	},
	alphaDefault : function() { 
		return '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	},
	alphaSet : function(arg) {
		arg ? this._E = arg : this._E = this.alphaDefault();	
		return this;
	},
	alphaExtend : function(arg) {
		if (arg instanceof Array) {
			if (this._E instanceof Array) {
				this._E = this._E.concat(arg)	
			} else {
				this._E = this._E.split('').concat(arg)
			}
		} else { 
			this._E += arg;
		}
		return this;
	},
	get : function() {
		return this._rep;
	},
	/* base(10) -> base(paramBase) */
	toBase : function(number,base) {
		var result=''; base = typeof base !== 'undefined' ? base : this._E.length;
		if (number === 0) {
			this._rep = this._E[0]; 
		} else {
			while(number) {
				var modulus = number % base
			    result = this._E[modulus]+result;
			    number = (number - modulus) / base
			}
			this._rep = result;	
		}
		return this;
	},
	/* base(var) -> base(10) */
	fromBase : function(number, base) {
		this._rep = ''; base = base = typeof base !== 'undefined' ? base : this._E.length;
		var k = 1, number = number.toString(), len = number.length, num = 0;
		for(var i = 0; i < len; i++) {
			var end = number[len-(k+i)];
			num += Math.pow(base,i) * this._E.indexOf(end); 
		}
		this._rep = num.toString();
		return this;
	},
	pad : function(bits, obj) {
		var self = obj || this;		
		if (/^\d+$/.test(bits)) {
			self.unpad(self);
			var i = 0, n = bits - self._rep.length;
			for(;i<n; i++) {
				self._rep = self._E.charAt(0)+self._rep;
			}
			return self;
		} else {
			throw new Error("pad(bits): bits must be a nonnegative integer.");
		}
	},
	unpad : function(obj) {
		self = obj || this;
		var i = 0, n = self._rep.length
		for(;i<n; i++) {
			if (self._rep[i] != self._E.charAt(0)) {
				self._rep = self._rep.slice(i);
				return self;
			}
		}
		self._rep = '';
	 	return self;
	},
	makeTag : function(rootBase,base) {
		this['base'+rootBase+'to'+base] = function(n) {
			return this.toBase(this.fromBase(n,rootBase).get(),base).get();
		}
		this['base'+base+'to'+rootBase] = function(n) {
			return this.toBase(this.fromBase(n,base).get(),rootBase).get();
		}
	}
}
if (typeof module !== 'undefined') module.exports = exports = new Basek();
