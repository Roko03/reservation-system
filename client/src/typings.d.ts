import { CSSProperties } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body3: CSSProperties;
    hero: CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: CSSProperties;
    hero?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    inherit: false;
    h4: false;
    h5: false;
    h6: false;
    caption: false;
    overline: false;
    subtitle1: false;
    subtitle2: false;
    body3: true;
    hero: true;
  }
}
