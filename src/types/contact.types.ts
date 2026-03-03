// src/types/contact.types.ts
import type { CONTACT_METHODS } from '../constants/contact';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactMethod {
  title: string;
  icon: string;
  color: string;
  value: string;
  link: string;
  description: string;
  bgPattern: string;
}

export type ContactMethods = typeof CONTACT_METHODS;
