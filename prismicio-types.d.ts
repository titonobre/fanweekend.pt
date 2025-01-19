// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type DashboardDocumentDataSlicesSlice =
  | RegistrationCardSlice
  | MyOwnCreationsSlice
  | EventProgramSlice
  | AccommodationInfoSlice
  | RegistrationStateSlice
  | MessageCardSlice;

/**
 * Content for Dashboard documents
 */
interface DashboardDocumentData {
  /**
   * Slice Zone field in *Dashboard*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: dashboard.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<DashboardDocumentDataSlicesSlice> /**
   * Meta Title field in *Dashboard*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: dashboard.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Dashboard*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: dashboard.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Dashboard*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: dashboard.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Dashboard document from Prismic
 *
 * - **API ID**: `dashboard`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type DashboardDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<DashboardDocumentData>,
  "dashboard",
  Lang
>;

export type AllDocumentTypes = DashboardDocument;

/**
 * Default variation for AccommodationInfo Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AccommodationInfoSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, never>;

/**
 * Slice variation for *AccommodationInfo*
 */
type AccommodationInfoSliceVariation = AccommodationInfoSliceDefault;

/**
 * AccommodationInfo Shared Slice
 *
 * - **API ID**: `accommodation_info`
 * - **Description**: AccommodationInfo
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AccommodationInfoSlice = prismic.SharedSlice<"accommodation_info", AccommodationInfoSliceVariation>;

/**
 * Default variation for EventProgram Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EventProgramSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, never>;

/**
 * Slice variation for *EventProgram*
 */
type EventProgramSliceVariation = EventProgramSliceDefault;

/**
 * EventProgram Shared Slice
 *
 * - **API ID**: `event_program`
 * - **Description**: EventProgram
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type EventProgramSlice = prismic.SharedSlice<"event_program", EventProgramSliceVariation>;

/**
 * Primary content in *MessageCard → Default → Primary*
 */
export interface MessageCardSliceDefaultPrimary {
  /**
   * Title field in *MessageCard → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: message_card.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Body field in *MessageCard → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: message_card.default.primary.body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;

  /**
   * CTA Label field in *MessageCard → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: message_card.default.primary.cta_label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  cta_label: prismic.KeyTextField;

  /**
   * CTA Link field in *MessageCard → Default → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: message_card.default.primary.cta_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  cta_link: prismic.LinkField;
}

/**
 * Default variation for MessageCard Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MessageCardSliceDefault = prismic.SharedSliceVariation<"default", Simplify<MessageCardSliceDefaultPrimary>, never>;

/**
 * Slice variation for *MessageCard*
 */
type MessageCardSliceVariation = MessageCardSliceDefault;

/**
 * MessageCard Shared Slice
 *
 * - **API ID**: `message_card`
 * - **Description**: MessageCard
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MessageCardSlice = prismic.SharedSlice<"message_card", MessageCardSliceVariation>;

/**
 * Default variation for MyOwnCreations Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MyOwnCreationsSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, never>;

/**
 * Slice variation for *MyOwnCreations*
 */
type MyOwnCreationsSliceVariation = MyOwnCreationsSliceDefault;

/**
 * MyOwnCreations Shared Slice
 *
 * - **API ID**: `my_own_creations`
 * - **Description**: MyOwnCreations
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MyOwnCreationsSlice = prismic.SharedSlice<"my_own_creations", MyOwnCreationsSliceVariation>;

/**
 * Default variation for RegistrationCard Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RegistrationCardSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, never>;

/**
 * Slice variation for *RegistrationCard*
 */
type RegistrationCardSliceVariation = RegistrationCardSliceDefault;

/**
 * RegistrationCard Shared Slice
 *
 * - **API ID**: `registration_card`
 * - **Description**: RegistrationCard
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RegistrationCardSlice = prismic.SharedSlice<"registration_card", RegistrationCardSliceVariation>;

/**
 * Default variation for RegistrationState Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RegistrationStateSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, never>;

/**
 * Slice variation for *RegistrationState*
 */
type RegistrationStateSliceVariation = RegistrationStateSliceDefault;

/**
 * RegistrationState Shared Slice
 *
 * - **API ID**: `registration_state`
 * - **Description**: RegistrationState
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type RegistrationStateSlice = prismic.SharedSlice<"registration_state", RegistrationStateSliceVariation>;

declare module "@prismicio/client" {
  interface CreateClient {
    (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      DashboardDocument,
      DashboardDocumentData,
      DashboardDocumentDataSlicesSlice,
      AllDocumentTypes,
      AccommodationInfoSlice,
      AccommodationInfoSliceVariation,
      AccommodationInfoSliceDefault,
      EventProgramSlice,
      EventProgramSliceVariation,
      EventProgramSliceDefault,
      MessageCardSlice,
      MessageCardSliceDefaultPrimary,
      MessageCardSliceVariation,
      MessageCardSliceDefault,
      MyOwnCreationsSlice,
      MyOwnCreationsSliceVariation,
      MyOwnCreationsSliceDefault,
      RegistrationCardSlice,
      RegistrationCardSliceVariation,
      RegistrationCardSliceDefault,
      RegistrationStateSlice,
      RegistrationStateSliceVariation,
      RegistrationStateSliceDefault,
    };
  }
}
