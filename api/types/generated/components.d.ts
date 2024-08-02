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
      'shared.social-medias': SharedSocialMedias;
    }
  }
}
