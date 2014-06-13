# basek.js
Use an array of multi-character alphanumeric symbols to convert between bases exceeding 62.

### Features
- Convert between a potentially infinite number of bases using an array representation of an alphabet.
- Predefined methods for converting between life's most popular bases (2,6,8,..62)
- Functionality that allows you to set your alphabet as a string or an array of strings
- Create your own convenience methods for converting between base(n) and base(k)
- Create a logically coherent chain of functions with the Basek object 
  - set an alphabet **->** convert to base **->** pad with digits

### Usage
##### Include in your Node.js project

```javascript
var basek = require('basek');
```
##### Include as a standalone

```html
<script src='basek.min.js'></script> // var basek = Basek()
```
===
The default alphabet is `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ` which supports all base conversions up to 62.

##### Predefined convenience methods

```javascript
basek.base10to2(15) // "1111"
basek.base10to16(15) // "f"
basek.base16to10("f") // "15"
basek.base2to10(1111) // "15" 
```
##### Defining a convenience method

```javascript
basek.makeTag(2,16) 
// Basek.prototype.base2to16 and Basek.prototype.base16to2 are now defined
basek.base2to16(1111) // "f"
basek.base16to2("f") // "1111"
```

##### Generics
- **Basek.prototype.toBase(n[, base])**
- **Basek.prototype.fromBase(n[, base])**

Convert to/from decimal using these generics. If you don't provide a base parameter, Basek uses the length of your alphabet to determine the base.

```javascript
basek.toBase(61).get() // "Z" 
basek.toBase(61,2).get() // "111110"
basek.fromBase("Z").get() // "61"
basek.fromBase("ff",16).get() // "255"
```

##### Alphabetic Representation
- **Basek.prototype.alpha()**
- **Basek.prototype.alphaDefault()**
- **Basek.prototype.alphaSet('abc' || ['a','b','c'])**
- **Basek.prototype.alphaExtend('abc' || ['a','b','c'])**
 
You can literally use any combination of multi-character symbols to extend Basek's alphabetic representation and thus extending your base limit.  First here's some basic usage.

```javascript
// Using only single character symbols
basek.alpha() 
// '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' - default base62
basek.alphaExtend('%^') 
// '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%^' - base64
basek.alphaSet() 
// '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' - back to default
basek.alphaSet('abcdefghijklmnopqrstuvwzyz')
// 'abcdefghijklmnopqrstuvwzyz' - alphabet set
basek.toBase(15,2).get() // 'bbbb'
```

Now using multi-character alphanumeric symbols to extend Basek's base range to 100

```javascript
basek.alphaSet() // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' - back to default
for (var i = 0; i < 38; i++) {
  basek.alphaExtend(['a'+i]);
} // alphabet set to Array[100] (['0','1',...,'a100'])
basek.toBase(99).get() // 'a37' - your multi-character symbol representing decimal 99 in base100
```

