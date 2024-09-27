import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductAffiliates extends Schema.Component {
  collectionName: 'components_product_affiliates';
  info: {
    displayName: 'affiliates';
    description: '';
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    url: Attribute.String & Attribute.Required;
  };
}

export interface ProductPrice extends Schema.Component {
  collectionName: 'components_product_prices';
  info: {
    displayName: 'price';
  };
  attributes: {
    regular: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    discount: Attribute.Decimal;
  };
}

export interface SharedImages extends Schema.Component {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'images';
  };
  attributes: {
    portrait: Attribute.Media<'images', true> & Attribute.Required;
    landscape: Attribute.Media<'images', true> & Attribute.Required;
  };
}

export interface SharedLogos extends Schema.Component {
  collectionName: 'components_shared_logos';
  info: {
    displayName: 'logos';
    icon: 'cube';
  };
  attributes: {
    mobile: Attribute.Media<'images'>;
    wordmark: Attribute.Media<'images'>;
    horizontal: Attribute.Media<'images'>;
    vertical: Attribute.Media<'images'>;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

export interface SharedSocialMedias extends Schema.Component {
  collectionName: 'components_shared_social_medias';
  info: {
    displayName: 'social media';
    icon: 'chartPie';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    icon: Attribute.Enumeration<
      ['facebook', 'twitter', 'instagram', 'youtube']
    > &
      Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'product.affiliates': ProductAffiliates;
      'product.price': ProductPrice;
      'shared.images': SharedImages;
      'shared.logos': SharedLogos;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'shared.social-medias': SharedSocialMedias;
    }
  }
}
