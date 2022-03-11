export const GOOGLE_SITE_VERIFICATION_CODE: string = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_CODE as string;
export const GA_TRACKING_ID: string = process.env.NEXT_PUBLIC_ANALYTICS_ID as string;

export const REGISTRATION_FORM_ID: string = process.env.REGISTRATION_FORM_ID as string;
export const REGISTRATION_SPREADSHEET_ID: string = process.env.REGISTRATION_SPREADSHEET_ID as string;
export const REGISTRATION_SPREADSHEET_SHEET_ID: string = process.env.REGISTRATION_SPREADSHEET_SHEET_ID as string;

export const REGISTRATION_ENABLED: boolean = process.env.NEXT_PUBLIC_ENABLED_FEATURES?.includes("registration") ?? false;
export const LOGIN_ENABLED: boolean = process.env.NEXT_PUBLIC_ENABLED_FEATURES?.includes("login") ?? false;
export const SHOW_PRICING: boolean = process.env.NEXT_PUBLIC_ENABLED_FEATURES?.includes("pricing") ?? false;

export const TAWK_TO_PROPERTY_ID: string = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID as string;
export const TAWK_TO_WIDGET_ID: string = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID as string;
export const TAWK_TO_API_KEY: string = process.env.TAWK_TO_API_KEY as string;

export const GOOGLE_CLIENT_EMAIL: string = process.env.GOOGLE_CLIENT_EMAIL as string;

export const REDIS_URL: string = process.env.REDIS_URL as string;
