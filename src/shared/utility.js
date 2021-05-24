class Utility {
  static formatCurrency = (num) => {
    const nf = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return nf.format(num);
  }

  static formatDate = (str) => {
    const dtf = new Intl.DateTimeFormat('en-US');
    return str.length > 0 ? dtf.format(new Date(str)) : str;
  }

  static getId = (arr) => {
    return arr.length > 0 ? Math.max.apply(this, arr.map(a => a.id)) + 1 : 0;
  }

  static getPages = (perPageLimit, data) => {
    const arr = [...data];
    const pages = [];

    while (arr.length) {
      pages.push(arr.splice(0, perPageLimit));
    }

    return pages;
  }

  static getSubtotal = (arr) => {
    return arr.reduce((a, c) => a + (Number(c.quantity) * Number(c.price)), 0);
  }

  static getTotalQuantity = (arr) => {
    return arr.reduce((a, c) => a + Number(c.quantity), 0);
  }
}

export default Utility;