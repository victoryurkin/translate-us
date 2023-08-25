import { ImageSourcePropType } from 'react-native';

export interface Language {
  code: string;
  name: string;
  image?: ImageSourcePropType;
}

export interface SupportedLanguages {
  [key: string]: Language;
}

const ar = require('@translate-us/assets/flags/ar.png');
const bn = require('@translate-us/assets/flags/bn.png');
const cn = require('@translate-us/assets/flags/cn.png');
const nl = require('@translate-us/assets/flags/nl.png');
const en = require('@translate-us/assets/flags/gb.png');
const fr = require('@translate-us/assets/flags/fr.png');
const de = require('@translate-us/assets/flags/de.png');
const it = require('@translate-us/assets/flags/it.png');
const pt = require('@translate-us/assets/flags/pt.png');
const es = require('@translate-us/assets/flags/es.png');

export const supportedInterfaceLanguages: SupportedLanguages = {
  'en-US': {
    code: 'en-US',
    name: 'English (United States)',
    image: require('@translate-us/assets/flags/us.png'),
  },
};

export const defaultInterfaceLanguage: Language = {
  code: 'en-US',
  name: 'English (United States)',
  image: require('@translate-us/assets/flags/us.png'),
};

export const supportedLanguages: SupportedLanguages = {
  'af-ZA': {
    code: 'af-ZA',
    name: 'Afrikaans (South Africa)',
    image: require('@translate-us/assets/flags/af.png'),
  },
  'sq-AL': {
    code: 'sq-AL',
    name: 'Albanian (Albania)',
    image: require('@translate-us/assets/flags/al.png'),
  },
  'am-ET': {
    code: 'am-ET',
    name: 'Amharic (Ethiopia)',
    image: require('@translate-us/assets/flags/am.png'),
  },
  'ar-DZ': {
    code: 'ar-DZ',
    name: 'Arabic (Algeria)',
    image: ar,
  },
  'ar-BH': {
    code: 'ar-BH',
    name: 'Arabic (Bahrain)',
    image: ar,
  },
  'ar-EG': {
    code: 'ar-EG',
    name: 'Arabic (Egypt)',
    image: ar,
  },
  'ar-IQ': {
    code: 'ar-IQ',
    name: 'Arabic (Iraq)',
    image: ar,
  },
  'ar-IL': {
    code: 'ar-IL',
    name: 'Arabic (Israel)',
    image: ar,
  },
  'ar-JO': {
    code: 'ar-JO',
    name: 'Arabic (Jordan)',
    image: ar,
  },
  'ar-KW': {
    code: 'ar-KW',
    name: 'Arabic (Kuwait)',
    image: ar,
  },
  'ar-LB': {
    code: 'ar-LB',
    name: 'Arabic (Lebanon)',
    image: ar,
  },
  'ar-MA': {
    code: 'ar-MA',
    name: 'Arabic (Morocco)',
    image: ar,
  },
  'ar-OM': {
    code: 'ar-OM',
    name: 'Arabic (Oman)',
    image: ar,
  },
  'ar-QA': {
    code: 'ar-QA',
    name: 'Arabic (Qatar)',
    image: ar,
  },
  'ar-SA': {
    code: 'ar-SA',
    name: 'Arabic (Saudi Arabia)',
    image: ar,
  },
  'ar-PS': {
    code: 'ar-PS',
    name: 'Arabic (State of Palestine)',
    image: ar,
  },
  'ar-TN': {
    code: 'ar-TN',
    name: 'Arabic (Tunisia)',
    image: ar,
  },
  'ar-AE': {
    code: 'ar-AE',
    name: 'Arabic (United Arab Emirates)',
    image: ar,
  },
  'ar-YE': {
    code: 'ar-YE',
    name: 'Arabic (Yemen)',
    image: ar,
  },
  'hy-AM': {
    code: 'hy-AM',
    name: 'Armenian (Armenia)',
    image: require('@translate-us/assets/flags/am.png'),
  },
  'az-AZ': {
    code: 'az-AZ',
    name: 'Azerbaijani (Azerbaijan)',
    image: require('@translate-us/assets/flags/az.png'),
  },
  'eu-ES': {
    code: 'eu-ES',
    name: 'Basque (Spain)',
    image: require('@translate-us/assets/flags/eu.png'),
  },
  'bn-BD': {
    code: 'bn-BD',
    name: 'Bengali (Bangladesh)',
    image: bn,
  },
  'bn-IN': {
    code: 'bn-IN',
    name: 'Bengali (India)',
    image: bn,
  },
  'bs-BA': {
    code: 'bs-BA',
    name: 'Bosnian (Bosnia and Herzegovina)',
    image: require('@translate-us/assets/flags/bs.png'),
  },
  'bg-BG': {
    code: 'bg-BG',
    name: 'Bulgarian (Bulgaria)',
    image: require('@translate-us/assets/flags/bg.png'),
  },
  'my-MM': {
    code: 'my-MM',
    name: 'Burmese (Myanmar)',
    image: require('@translate-us/assets/flags/my.png'),
  },
  'ca-ES': {
    code: 'ca-ES',
    name: 'Catalan (Spain)',
    image: require('@translate-us/assets/flags/ca.png'),
  },
  'yue-Hant-HK': {
    code: 'yue-Hant-HK',
    name: 'Chinese, Cantonese (Traditional Hong Kong)',
    image: cn,
  },
  'zh (cmn-Hans-CN)': {
    code: 'zh (cmn-Hans-CN)',
    name: 'Chinese, Mandarin (Simplified, China)',
    image: cn,
  },
  'zh-TW (cmn-Hant-TW)': {
    code: 'zh-TW (cmn-Hant-TW)',
    name: 'Chinese, Mandarin (Traditional, Taiwan)',
    image: cn,
  },
  'hr-HR': {
    code: 'hr-HR',
    name: 'Croatian (Croatia)',
    image: require('@translate-us/assets/flags/hr.png'),
  },
  'cs-CZ': {
    code: 'cs-CZ',
    name: 'Czech (Czech Republic)',
    image: require('@translate-us/assets/flags/cz.png'),
  },
  'da-DK': {
    code: 'da-DK',
    name: 'Danish (Denmark)',
    image: require('@translate-us/assets/flags/dk.png'),
  },
  'nl-BE': {
    code: 'nl-BE',
    name: 'Dutch (Belgium)',
    image: nl,
  },
  'nl-NL': {
    code: 'nl-NL',
    name: 'Dutch (Netherlands)',
    image: nl,
  },
  'en-AU': {
    code: 'en-AU',
    name: 'English (Australia)',
    image: en,
  },
  'en-CA': {
    code: 'en-CA',
    name: 'English (Canada)',
    image: en,
  },
  'en-GH': {
    code: 'en-GH',
    name: 'English (Ghana)',
    image: en,
  },
  'en-HK': {
    code: 'en-HK',
    name: 'English (Hong Kong)',
    image: en,
  },
  'en-IN': {
    code: 'en-IN',
    name: 'English (India)',
    image: en,
  },
  'en-IE': {
    code: 'en-IE',
    name: 'English (Ireland)',
    image: en,
  },
  'en-KE': {
    code: 'en-KE',
    name: 'English (Kenya)',
    image: en,
  },
  'en-NZ': {
    code: 'en-NZ',
    name: 'English (New Zealand)',
    image: en,
  },
  'en-NG': {
    code: 'en-NG',
    name: 'English (Nigeria)',
    image: en,
  },
  'en-PK': {
    code: 'en-PK',
    name: 'English (Pakistan)',
    image: en,
  },
  'en-PH': {
    code: 'en-PH',
    name: 'English (Philippines)',
    image: en,
  },
  'en-SG': {
    code: 'en-SG',
    name: 'English (Singapore)',
    image: en,
  },
  'en-ZA': {
    code: 'en-ZA',
    name: 'English (South Africa)',
    image: en,
  },
  'en-TZ': {
    code: 'en-TZ',
    name: 'English (Tanzania)',
    image: en,
  },
  'en-GB': {
    code: 'en-GB',
    name: 'English (United Kingdom)',
    image: en,
  },
  'en-US': {
    code: 'en-US',
    name: 'English (United States)',
    image: require('@translate-us/assets/flags/us.png'),
  },
  'et-EE': {
    code: 'et-EE',
    name: 'Estonian (Estonia)',
    image: require('@translate-us/assets/flags/et.png'),
  },
  'fil-PH': {
    code: 'fil-PH',
    name: 'Filipino (Philippines)',
    image: require('@translate-us/assets/flags/ph.png'),
  },
  'fi-FI': {
    code: 'fi-FI',
    name: 'Finnish (Finland)',
    image: require('@translate-us/assets/flags/fi.png'),
  },
  'fr-BE': {
    code: 'fr-BE',
    name: 'French (Belgium)',
    image: fr,
  },
  'fr-CA': {
    code: 'fr-CA',
    name: 'French (Canada)',
    image: fr,
  },
  'fr-FR': {
    code: 'fr-FR',
    name: 'French (France)',
    image: fr,
  },
  'fr-CH': {
    code: 'fr-CH',
    name: 'French (Switzerland)',
    image: fr,
  },
  'gl-ES': {
    code: 'gl-ES',
    name: 'Galician (Spain)',
    image: require('@translate-us/assets/flags/gl.png'),
  },
  'ka-GE': {
    code: 'ka-GE',
    name: 'Georgian (Georgia)',
    image: require('@translate-us/assets/flags/ge.png'),
  },
  'de-AT': {
    code: 'de-AT',
    name: 'German (Austria)',
    image: de,
  },
  'de-DE': {
    code: 'de-DE',
    name: 'German (Germany)',
    image: de,
  },
  'de-CH': {
    code: 'de-CH',
    name: 'German (Switzerland)',
    image: de,
  },
  'el-GR': {
    code: 'el-GR',
    name: 'Greek (Greece)',
    image: require('@translate-us/assets/flags/gr.png'),
  },
  'gu-IN': {
    code: 'gu-IN',
    name: 'Gujarati (India)',
    image: require('@translate-us/assets/flags/gu.png'),
  },
  'iw-IL': {
    code: 'iw-IL',
    name: 'Hebrew (Israel)',
    image: require('@translate-us/assets/flags/il.png'),
  },
  'hi-IN': {
    code: 'hi-IN',
    name: 'Hindi (India)',
    image: require('@translate-us/assets/flags/in.png'),
  },
  'hu-HU': {
    code: 'hu-HU',
    name: 'Hungarian (Hungary)',
    image: require('@translate-us/assets/flags/hu.png'),
  },
  'is-IS': {
    code: 'is-IS',
    name: 'Icelandic (Iceland)',
    image: require('@translate-us/assets/flags/is.png'),
  },
  'id-ID': {
    code: 'id-ID',
    name: 'Indonesian (Indonesia)',
    image: require('@translate-us/assets/flags/id.png'),
  },
  'it-IT': {
    code: 'it-IT',
    name: 'Italian (Italy)',
    image: it,
  },
  'it-CH': {
    code: 'it-CH',
    name: 'Italian (Switzerland)',
    image: it,
  },
  'ja-JP': {
    code: 'ja-JP',
    name: 'Japanese (Japan)',
    image: require('@translate-us/assets/flags/jp.png'),
  },
  'jv-ID': {
    code: 'jv-ID',
    name: 'Javanese (Indonesia)',
    image: require('@translate-us/assets/flags/id.png'),
  },
  'kn-IN': {
    code: 'kn-IN',
    name: 'Kannada (India)',
    image: require('@translate-us/assets/flags/kn.png'),
  },
  'kk-KZ': {
    code: 'kk-KZ',
    name: 'Kazakh (Kazakhstan)',
    image: require('@translate-us/assets/flags/kz.png'),
  },
  'km-KH': {
    code: 'km-KH',
    name: 'Khmer (Cambodia)',
    image: require('@translate-us/assets/flags/km.png'),
  },
  'ko-KR': {
    code: 'ko-KR',
    name: 'Korean (South Korea)',
    image: require('@translate-us/assets/flags/kr.png'),
  },
  'lo-LA': {
    code: 'lo-LA',
    name: 'Lao (Laos)',
    image: require('@translate-us/assets/flags/la.png'),
  },
  'lv-LV': {
    code: 'lv-LV',
    name: 'Latvian (Latvia)',
    image: require('@translate-us/assets/flags/lv.png'),
  },
  'lt-LT': {
    code: 'lt-LT',
    name: 'Lithuanian (Lithuania)',
    image: require('@translate-us/assets/flags/lt.png'),
  },
  'mk-MK': {
    code: 'mk-MK',
    name: 'Macedonian (North Macedonia)',
    image: require('@translate-us/assets/flags/mk.png'),
  },
  'ms-MY': {
    code: 'ms-MY',
    name: 'Malay (Malaysia)',
    image: require('@translate-us/assets/flags/ms.png'),
  },
  'ml-IN': {
    code: 'ml-IN',
    name: 'Malayalam (India)',
    image: require('@translate-us/assets/flags/ml.png'),
  },
  'mr-IN': {
    code: 'mr-IN',
    name: 'Marathi (India)',
    image: require('@translate-us/assets/flags/mr.png'),
  },
  'mn-MN': {
    code: 'mn-MN',
    name: 'Mongolian (Mongolia)',
    image: require('@translate-us/assets/flags/mn.png'),
  },
  'ne-NP': {
    code: 'ne-NP',
    name: 'Nepali (Nepal)',
    image: require('@translate-us/assets/flags/ne.png'),
  },
  'no-NO': {
    code: 'no-NO',
    name: 'Norwegian Bokmål (Norway)',
    image: require('@translate-us/assets/flags/no.png'),
  },
  'fa-IR': {
    code: 'fa-IR',
    name: 'Persian (Iran)',
    image: require('@translate-us/assets/flags/ir.png'),
  },
  'pl-PL': {
    code: 'pl-PL',
    name: 'Polish (Poland)',
    image: require('@translate-us/assets/flags/pl.png'),
  },
  'pt-BR': {
    code: 'pt-BR',
    name: 'Portuguese (Brazil)',
    image: pt,
  },
  'pt-PT': {
    code: 'pt-PT',
    name: 'Portuguese (Portugal)',
    image: pt,
  },
  'pa-Guru-IN': {
    code: 'pa-Guru-IN',
    name: 'Punjabi (Gurmukhi India)',
    image: require('@translate-us/assets/flags/pa.png'),
  },
  'ro-RO': {
    code: 'ro-RO',
    name: 'Romanian (Romania)',
    image: require('@translate-us/assets/flags/ro.png'),
  },
  'ru-RU': {
    code: 'ru-RU',
    name: 'Russian (Russia)',
    image: require('@translate-us/assets/flags/ru.png'),
  },
  'sr-RS': {
    code: 'sr-RS',
    name: 'Serbian (Serbia)',
    image: require('@translate-us/assets/flags/sr.png'),
  },
  'si-LK': {
    code: 'si-LK',
    name: 'Sinhala (Sri Lanka)',
    image: require('@translate-us/assets/flags/si.png'),
  },
  'sk-SK': {
    code: 'sk-SK',
    name: 'Slovak (Slovakia)',
    image: require('@translate-us/assets/flags/sk.png'),
  },
  'sl-SI': {
    code: 'sl-SI',
    name: 'Slovenian (Slovenia)',
    image: require('@translate-us/assets/flags/sl.png'),
  },
  'es-AR': {
    code: 'es-AR',
    name: 'Spanish (Argentina)',
    image: es,
  },
  'es-BO': {
    code: 'es-BO',
    name: 'Spanish (Bolivia)',
    image: es,
  },
  'es-CL': {
    code: 'es-CL',
    name: 'Spanish (Chile)',
    image: es,
  },
  'es-CO': {
    code: 'es-CO',
    name: 'Spanish (Colombia)',
    image: es,
  },
  'es-CR': {
    code: 'es-CR',
    name: 'Spanish (Costa Rica)',
    image: es,
  },
  'es-DO': {
    code: 'es-DO',
    name: 'Spanish (Dominican Republic)',
    image: es,
  },
  'es-EC': {
    code: 'es-EC',
    name: 'Spanish (Ecuador)',
    image: es,
  },
  'es-SV': {
    code: 'es-SV',
    name: 'Spanish (El Salvador)',
    image: es,
  },
  'es-GT': {
    code: 'es-GT',
    name: 'Spanish (Guatemala)',
    image: es,
  },
  'es-HN': {
    code: 'es-HN',
    name: 'Spanish (Honduras)',
    image: es,
  },
  'es-MX': {
    code: 'es-MX',
    name: 'Spanish (Mexico)',
    image: es,
  },
  'es-NI': {
    code: 'es-NI',
    name: 'Spanish (Nicaragua)',
    image: es,
  },
  'es-PA': {
    code: 'es-PA',
    name: 'Spanish (Panama)',
    image: es,
  },
  'es-PY': {
    code: 'es-PY',
    name: 'Spanish (Paraguay)',
    image: es,
  },
  'es-PE': {
    code: 'es-PE',
    name: 'Spanish (Peru)',
    image: es,
  },
  'es-PR': {
    code: 'es-PR',
    name: 'Spanish (Puerto Rico)',
    image: es,
  },
  'es-ES': {
    code: 'es-ES',
    name: 'Spanish (Spain)',
    image: es,
  },
  'es-US': {
    code: 'es-US',
    name: 'Spanish (United States)',
    image: es,
  },
  'es-UY': {
    code: 'es-UY',
    name: 'Spanish (Uruguay)',
    image: es,
  },
  'es-VE': {
    code: 'es-VE',
    name: 'Spanish (Venezuela)',
    image: es,
  },
  'su-ID': {
    code: 'su-ID',
    name: 'Sundanese (Indonesia)',
    image: require('@translate-us/assets/flags/id.png'),
  },
  'sw-KE': {
    code: 'sw-KE',
    name: 'Swahili (Kenya)',
    image: require('@translate-us/assets/flags/ke.png'),
  },
  'sw-TZ': {
    code: 'sw-TZ',
    name: 'Swahili (Tanzania)',
    image: require('@translate-us/assets/flags/tz.png'),
  },
  'sv-SE': {
    code: 'sv-SE',
    name: 'Swedish (Sweden)',
    image: require('@translate-us/assets/flags/sv.png'),
  },
  'ta-IN': {
    code: 'ta-IN',
    name: 'Tamil (India)',
    image: require('@translate-us/assets/flags/in.png'),
  },
  'ta-MY': {
    code: 'ta-MY',
    name: 'Tamil (Malaysia)',
    image: require('@translate-us/assets/flags/my.png'),
  },
  'ta-SG': {
    code: 'ta-SG',
    name: 'Tamil (Singapore)',
    image: require('@translate-us/assets/flags/sg.png'),
  },
  'ta-LK': {
    code: 'ta-LK',
    name: 'Tamil (Sri Lanka)',
    image: require('@translate-us/assets/flags/lk.png'),
  },
  'te-IN': {
    code: 'te-IN',
    name: 'Telugu (India)',
    image: require('@translate-us/assets/flags/in.png'),
  },
  'th-TH': {
    code: 'th-TH',
    name: 'Thai (Thailand)',
    image: require('@translate-us/assets/flags/th.png'),
  },
  'tr-TR': {
    code: 'tr-TR',
    name: 'Turkish (Turkey)',
    image: require('@translate-us/assets/flags/tr.png'),
  },
  'uk-UA': {
    code: 'uk-UA',
    name: 'Ukrainian (Ukraine)',
    image: require('@translate-us/assets/flags/ua.png'),
  },
  'ur-IN': {
    code: 'ur-IN',
    name: 'Urdu (India)',
    image: require('@translate-us/assets/flags/in.png'),
  },
  'ur-PK': {
    code: 'ur-PK',
    name: 'Urdu (Pakistan)',
    image: require('@translate-us/assets/flags/pk.png'),
  },
  'uz-UZ': {
    code: 'uz-UZ',
    name: 'Uzbek (Uzbekistan)',
    image: require('@translate-us/assets/flags/uz.png'),
  },
  'vi-VN': {
    code: 'vi-VN',
    name: 'Vietnamese (Vietnam)',
    image: require('@translate-us/assets/flags/vi.png'),
  },
  'zu-ZA': {
    code: 'zu-ZA',
    name: 'Zulu (South Africa)',
    image: require('@translate-us/assets/flags/za.png'),
  },
};
