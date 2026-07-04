import bostonmedicalLogo from "../../assets/bostonmedical.png";
import { API_BASE_URL } from "../config";

export const PRODUCT_LINES = {
  JOINTRIM: {
    id: 'JOINTRIM',
    name: 'Bostonmedical',
    baseUrl: API_BASE_URL,
    enabled: true,
    logo: bostonmedicalLogo
  },
  // GETTRIM: {
  //   id: 'GETTRIM',
  //   name: 'priderx',
  //   baseUrl: 'https://panel.whitelabelmd.com/pharmaura',
  //   enabled: true,
  //   logo: logo,
  //   // logo: 'https://www.gettrim.com/wp-content/uploads/2024/12/GetTrim-Logo-with-TM-1.png'
  // }
} as const;

export type ProductLine = keyof typeof PRODUCT_LINES;