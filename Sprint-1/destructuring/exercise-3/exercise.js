let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

const printReceipt = (order) => {
  const totalBill =
    order.reduce((acc, item) => acc + item.quantity * item.unitPricePence, 0) /
    100;
  const colWidths = { qty: 7, itemName: 20, unitPricePence: 10 };
  const header = `${"QTY".padEnd(colWidths.qty)}${"ITEM".padEnd(colWidths.itemName)}${"TOTAL".padEnd(colWidths.unitPricePence)}`;
  const table = order.reduce((acc, { itemName, quantity, unitPricePence }) => {
    const totalItemPrice = ((quantity * unitPricePence) / 100).toFixed(2);
    const row = `${String(quantity).padEnd(colWidths.qty)}${String(itemName).padEnd(colWidths.itemName)}${String(totalItemPrice).padEnd(colWidths.unitPricePence)}`;
    return acc + row + "\n";
  }, header + "\n");
  return table + "\n" + `Total: ${totalBill.toFixed(2)}`;
};

console.log(printReceipt(order));
