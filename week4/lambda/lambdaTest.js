// requires lambda.js

let lambdaOk = [];

lambdaOk.push(id(id) === id );

lambdaOk.push(konst(5)(1) === 5 );
lambdaOk.push(konst(true)(null) === true );
lambdaOk.push(konst(id)(undefined) === id );

lambdaOk.push(F(1)(5) === 5 );
lambdaOk.push(F(null)(true) === true );
lambdaOk.push(F(undefined)(id) === id );

const p = Pair(1)(2);
lambdaOk.push(fst(p) === 1 );
lambdaOk.push(snd(p) === 2 );

const updatedPair = Pair(fst(p) + 1)(snd(p));

// test result report
if ( lambdaOk.every(elem => elem) ) {
    document.writeln("All " + lambdaOk.length + " tests ok.");
} else {
    document.writeln("Not all tests ok! Details:");
    for (let i = 0; i < lambdaOk.length; i++) {
        if(lambdaOk[i]) {
            document.writeln("Test "+ i +" ok");
        } else {
            document.writeln("Test "+ i +" failed");
        }
    }
}
