export const GOOGLE_SITE_VERIFICATION_CODE: string = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_CODE as string;
export const GA_TRACKING_ID: string = process.env.NEXT_PUBLIC_ANALYTICS_ID as string;

export const REGISTRATION_FORM_ID: string = process.env.REGISTRATION_FORM_ID as string;
export const REGISTRATION_SPREADSHEET_ID: string = process.env.REGISTRATION_SPREADSHEET_ID as string;
export const REGISTRATION_SPREADSHEET_SHEET_ID: string = process.env.REGISTRATION_SPREADSHEET_SHEET_ID as string;

export const EXTRA_NIGHT_FORM_ID: string = process.env.EXTRA_NIGHT_FORM_ID as string;

export const REGISTRATION_ENABLED: boolean = process.env.NEXT_PUBLIC_ENABLED_FEATURES?.includes("registration") ?? false;
export const LOGIN_ENABLED: boolean = process.env.NEXT_PUBLIC_ENABLED_FEATURES?.includes("login") ?? false;
export const SHOW_PRICING: boolean = process.env.NEXT_PUBLIC_ENABLED_FEATURES?.includes("pricing") ?? false;

export const TAWK_TO_PROPERTY_ID: string = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID as string;
export const TAWK_TO_WIDGET_ID: string = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID as string;
export const TAWK_TO_API_KEY: string = process.env.TAWK_TO_API_KEY as string;

export const GOOGLE_CLIENT_EMAIL: string = process.env.GOOGLE_CLIENT_EMAIL as string;

export const REDIS_URL: string = process.env.REDIS_URL as string;

export const AUTH0_DOMAIN: string = process.env.AUTH0_DOMAIN as string;
export const AUTH0_CLIENT_ID: string = process.env.AUTH0_CLIENT_ID as string;
export const AUTH0_CLIENT_SECRET: string = process.env.AUTH0_CLIENT_SECRET as string;

export const PAYMENT_ACCOUNT_HOLDER = process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_HOLDER as string;
export const PAYMENT_ACCOUNT_IBAN = process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_IBAN as string;
export const PAYMENT_ACCOUNT_BIC_SWIFT = process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_BIC_SWIFT as string;
