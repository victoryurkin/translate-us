interface Product {
  i18n: string;
  period?: string;
}

interface Products {
  [key: string]: Product;
}

export const products: Products = {
  subMonth: {
    i18n: 'monthly_subscription',
    period: 'month',
  },
  subYear: {
    i18n: 'annual_subscription',
    period: 'year',
  },
  prodOneDay: {
    i18n: 'one_day',
  },
  'submonth:planmonth': {
    i18n: 'monthly_subscription',
    period: 'month',
  },
  'subyear:planyear': {
    i18n: 'annual_subscription',
    period: 'year',
  },
  'nrsubday:plandaynonrenewing': {
    i18n: 'one_day',
  },
};
