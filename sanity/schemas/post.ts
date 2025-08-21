import { Rule } from "sanity";

export const post = {
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule: Rule) => Rule.max(200).error("Max 200 characters"),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule: Rule) => Rule.required(),
        },
        { name: "caption", title: "Caption", type: "string" },
      ],
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            { type: "text", name: "alt", title: "Alt" },
            { type: "string", name: "caption", title: "Caption" },
          ],
        },
        {
          type: "object",
          name: "callToAction",
          title: "Call To Action",
          fields: [
            { name: "text", title: "Text", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
        {
          type: "object",
          name: "embed",
          title: "Embed",
          fields: [
            { name: "url", title: "Embed URL", type: "url" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string" },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          validation: (Rule: Rule) => Rule.max(160),
        },
        {
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "author.name",
      media: "coverImage",
    },
  },
};
