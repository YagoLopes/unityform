export const money = (valor: string) => {
  let valorSemPontoVirgula;
  if (Number.isInteger(valor)) {
    valorSemPontoVirgula = `${valor}.00`;
  } else {
    valorSemPontoVirgula = `${valor}`;
  }

  const casaDecimal = valorSemPontoVirgula.split('.')[1] || '00';

  if (casaDecimal.length < 2) {
    valorSemPontoVirgula = `${valor}0`;
  } else if (Number(casaDecimal) > 2) {
    valorSemPontoVirgula = `${Number(valor).toFixed(2)}`;
  }

  return valorSemPontoVirgula
    .replace(/\D/g, '') // permite digitar apenas número
    .replace(/^0*/gm, '') // bloqueia zeros à esquerda
    .replace(/(\d)(\d{23})$/, '$1.$2') // coloca ponto antes dos últimos 23 dígitos
    .replace(/(\d)(\d{20})$/, '$1.$2') // coloca ponto antes dos últimos 20 dígitos
    .replace(/(\d)(\d{17})$/, '$1.$2') // coloca ponto antes dos últimos 17 dígitos
    .replace(/(\d)(\d{14})$/, '$1.$2') // coloca ponto antes dos últimos 14 dígitos
    .replace(/(\d)(\d{11})$/, '$1.$2') // coloca ponto antes dos últimos 11 dígitos
    .replace(/(\d)(\d{8})$/, '$1.$2') // coloca ponto antes dos últimos 8 dígitos
    .replace(/(\d)(\d{5})$/, '$1.$2') // coloca ponto antes dos últimos 5 dígitos
    .replace(/(\d)(\d{1,2})?$/, '$1,$2'); // coloca vírgula antes dos primeiros 2 dígitos;
};
