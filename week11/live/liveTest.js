
test("function composition", assert => {

    const plusOne  = x => x + 1;
    const timesTwo = x => x * 2;

    // prozedural
    const plusOneTimesTwo = x => {
        const y = plusOne(x); // replace ; with .then
        const z = timesTwo(y);
        return z;
    }
    const plusOneTimesTwo2 = x => timesTwo(plusOne(x));

    // programming "between the lines"
    // "the programmable semicolon"
    Function.prototype.then = function(fn) {
        return x => {
            const t = this(x);
            console.log("weiterleiten von",t)
            return fn(t)
        };
    };


    // point-free style
    const plusOneTimesTwo3 = plusOne.then(timesTwo);

    assert.equals(plusOneTimesTwo(1) , 4);
    assert.equals(plusOneTimesTwo2(1), 4);
    assert.equals(plusOneTimesTwo3(1), 4);

    const plusThree = plusOne
                        .then( x => x + 1)
                        .then(plusOne);
    assert.equals(plusThree(1), 4);

    const Logger = startWert => {
        const mayWrap = x => (undefined === x ||
                              null      === x ||
                              undefined === x.then) ? Logger(x) : x;
        return {
           then: fn => { // flatMap, >>=, "bind"
               console.log("have been called with", startWert);
               return mayWrap(fn(startWert))
           }
        }
    }

    Logger(1).then(x => x+1)
             .then(x => x*2)
             .then(x => Logger(x / 2))
             .then(result => console.log("result is",result));

})
