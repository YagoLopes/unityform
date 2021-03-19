export const percent = (valor: number, casasDecimais = 2) => {
  let valorNormalizado;
  if (Number.isInteger(valor)) {
    valorNormalizado = `${valor}00`;
  } else if (Number.isFinite(valor)) {
    valorNormalizado = valor * 100;
    valorNormalizado = String(Math.round(valorNormalizado * 100) / 100);
  } else {
    valorNormalizado = `${valor}`;
  }
  valorNormalizado = valorNormalizado.replace(/\D/g, '');
  let reAntesVirgula;
  if (valorNormalizado.length - casasDecimais > 1) {
    if (valor >= 100) {
      const qtd = valorNormalizado.length - casasDecimais;
      reAntesVirgula = new RegExp(`(\\d{${qtd}})(\\d)`);
    } else {
      reAntesVirgula = new RegExp(`(\\d{2})(\\d)`);
    }
  } else {
    reAntesVirgula = new RegExp(`(\\d)(\\d)`);
  }
  return valorNormalizado
    .replace(reAntesVirgula, '$1,$2')
    .replace(new RegExp(`(,\\d{${casasDecimais}})\\d+?`), '$1');
};
