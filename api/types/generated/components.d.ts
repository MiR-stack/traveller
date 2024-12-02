import type { Attribute, Schema } from '@strapi/strapi';

export interface ProductAffiliates extends Schema.Component {
  collectionName: 'components_product_affiliates';
  info: {
    description: '';
    displayName: 'affiliates';
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
    discount: Attribute.Decimal;
    regular: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface SharedImages extends Schema.Component {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'images';
  };
  attributes: {
    landscape: Attribute.Media<'images', true> & Attribute.Required;
    portrait: Attribute.Media<'images', true> & Attribute.Required;
  };
}

export interface SharedLogos extends Schema.Component {
  collectionName: 'components_shared_logos';
  info: {
    displayName: 'logos';
    icon: 'cube';
  };
  attributes: {
    horizontal: Attribute.Media<'images'>;
    mobile: Attribute.Media<'images'>;
    vertical: Attribute.Media<'images'>;
    wordmark: Attribute.Media<'images'>;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Attribute.String;
    keywords: Attribute.Text;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Attribute.String;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Attribute.String;
    structuredData: Attribute.JSON;
  };
}

export interface SharedSocialMedias extends Schema.Component {
  collectionName: 'components_shared_social_medias';
  info: {
    description: '';
    displayName: 'social media';
    icon: 'chartPie';
  };
  attributes: {
    icon: Attribute.Enumeration<
      ['facebook', 'twitter', 'instagram', 'youtube']
    > &
      Attribute.Required;
    name: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
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
