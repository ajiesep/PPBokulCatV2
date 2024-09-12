function rupiahFormat(num) {
  let data = num.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return data;
}
module.exports = rupiahFormat;
