# react-key-string

This is a simple utility for generating psuedo-random strings that React can use as keys.
When you have an endpoint or other object which needs to be iterated over in React, but there
isn't an obvious id which can be provided with it, this library can generate one.

You can control the output and whether or not you need the key to be unique by using the following simple API:

## Install

```bash
yarn add react-key-string

npm install react-key-string
```

## Usage

```javascript
// ES6 Modules
import key from 'react-key-string';

// CommonJS
const key = require('react-key-string').default;
```

## Simple Example

```javascript
import key from 'react-key-string'

app.get('/users/', function(req, res) {
    const mockUsers = [
        {
            first: 'Grace',
            last: 'Mills',
            id: key.generate(),
        },
        {
            first: 'Steven',
            last: 'Nelson',
            id: key.generate(),
        },
    ];

    res.json({
        users: mockUsers,
    });
});
```

```javascript
const NameComponent = ({ names }) => (
    <ul>
        {names.map(name => (
            <li key={name.id}>
                Hello my name is {name.first} {name.last}
            </li>
        ))}
    </ul>
);
```

You may also generate `n` number of keys

```javascript
const keys = key.generateList(10);

console.log(keys.length === 10);

// true
```

## API

```javascript
/*
 * Examples for how to customize various aspects of the package
 */
import key from 'react-key-string';
```

```javascript
/*
 * Change the length of the key
 *
 * @set
 * Defaults to: 4
 */
key.length = 4;
```
```javascript
/*
 * Change the tokens which react-key-string uses to generate the key
 *
 * @set
 * Defaults to: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"
 */
key.length = 'abcde123';
```
```javascript
/*
 * Define whether or not the key MUST be unique
 *
 * Whenever this is true an array will be created in memory which stores all previously created keys
 * during the life of the application. This will NOT persist!
 *
 * @set
 * Defaults to: false
 */
key.unique = true;
```
```javascript
/*
 * Change the number of times react-key-string tries to find a unique key before giving up.
 *
 * @set
 * Defaults to: 15
 */
key.maxTries = 10;
```
```javascript
/*
 * Check if keys returned are unique
 *
 * @get
 * Returns: boolean
 */
const unique: boolean = key.unique;
```
```javascript
/*
 * Get all the used keys from the in-memory array.
 *
 * @get
 * Returns: []string
 */
const usedKeys: string[] = key.usedKeys;
```
```javascript
/*
 * Clear all the used keys from the in-memory array. This resets the unique check and can cause non-unique
 * keys to appear in your application.
 *
 * @method
 * Returns: void
 */
key.clearUsedKeys();
```

## Contributions

I welcome any help regarding this module. Please open a PR or Issue and I will try to respond quickly. - Thanks