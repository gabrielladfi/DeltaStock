export const adaptercvv = (data) => ({
    UVT: data.UVT,
    cargovariable_por_factor: data.cargovariable_por_factor,
    factor_m: data.factor_m,
    factor_q: data.factor_q, // Se mantiene la estructura original
    factor_i: data.factor_i, // Se mantiene la estructura original
    referencias_excepciones: data.referencias_excepciones, // Se mantiene la estructura original
    area_q: data.area_q, // Se mantiene la estructura original
  });
  