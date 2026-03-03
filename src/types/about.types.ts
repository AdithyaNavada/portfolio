// src/types/about.types.ts
export interface AboutPageProps {
  openContactWindow?: () => void;
}

export interface ProfileData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    avatar: string;
  };
  sections: {
    [key: string]: {
      icon: string;
      title: string;
      color: string;
      content?: any;
      roles?: any[];
      awards?: any[];
      domains?: any[];
    };
  };
}
