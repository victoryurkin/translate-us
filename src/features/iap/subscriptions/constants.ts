interface Product {
  i18n: string;
}

interface Products {
  [key: string]: Product;
}

export const products: Products = {
  subMonth: {
    i18n: 'monthly_subscription',
  },
  subYear: {
    i18n: 'annual_subscription',
  },
  nrSubDay: {
    i18n: 'one_day',
  },
  'submonth:planmonth': {
    i18n: 'monthly_subscription',
  },
  'subyear:planyear': {
    i18n: 'annual_subscription',
  },
  'nrsubday:plandaynonrenewing': {
    i18n: 'one_day',
  },
};
