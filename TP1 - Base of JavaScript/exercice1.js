function factorielIt(x){
    var fac1 = 1;
    for(var k = 1; k <= x; k++){
        fac1 = fac1 * k;
    }
    return fac1;
}

function factorielRec(x){
    if (x === 1){
        return 1;
    } else {
    return x*factorielRec(x-1);
    }
}

function factorielTableau(x){
    var appli = [ ];
    for(var kk = 0; kk < x.length; kk++){
        appli[kk] = factorielRec(x[kk]);
    }
    return appli;
}

function factorielMap(x){
    var res = x.map(factorielRec);
    return res;
}



//test:
function test(){
    var A = [3,4,5];
    console.log("Results of factorielIt: " + factorielIt(4));
    console.log("Results of factorielRec: " + factorielRec(4));
    console.log("Original table: " + A);
    console.log("Results of factorielTableau: " + factorielTableau(A));
    console.log("Results of factorielMap: " + factorielMap(A));
}
test();