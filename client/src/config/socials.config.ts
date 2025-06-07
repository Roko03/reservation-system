import { ElementType } from 'react';

import { Email, Phone, WhatsApp } from '@mui/icons-material';

export interface SocialLink {
  slug: string;
  label: string;
  icon: ElementType;
}

const socials: SocialLink[] = [
  {
    slug: 'mailto:roko@gmail.com',
    label: 'Email',
    icon: Email,
  },
  {
    slug: '/whap',
    label: 'WhatsApp',
    icon: WhatsApp,
  },
  {
    slug: 'tel:0923460964',
    label: 'Call',
    icon: Phone,
  },
];

export default socials;
