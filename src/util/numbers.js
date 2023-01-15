/**
 * 1 / 3 에 자릿수 2면
 * 0.33
 * @param numerator 분자
 * @param denominator 분모
 * @param precision 자릿수
 * @returns
 */
const toFloatPrecision = (numerator, denominator, precision ) => {

  let returnVal = Math.floor((numerator * 10 ** precision) / denominator) / 10 ** precision;

  if(isNaN(returnVal)){
    return 0;
  }

  return returnVal;
  
};

export { toFloatPrecision };
