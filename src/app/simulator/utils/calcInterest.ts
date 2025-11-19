export function calcInterest(
  initialAmount: number,
  monthlyAmount: number,
  months: number
) {
  const tasaMensual = 0.04 / 12

  let total = initialAmount

  for (let i = 0; i < months; i++) {
    total = total * (1 + tasaMensual) + monthlyAmount
  }

  return total
}
