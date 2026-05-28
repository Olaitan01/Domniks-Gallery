// schemaTypes/work.ts

export default {
  name: 'Artwork',
  title: 'Domnik Gallery',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },

    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },

    {
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g. Oil on Canvas, Digital Art, Photography',
    },

    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g. 120cm x 80cm',
    },

    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Painting', value: 'painting'},
          {title: 'Photography', value: 'photography'},
          {title: 'Digital Art', value: 'digital-art'},
          {title: 'Illustration', value: 'illustration'},
          {title: 'Sculpture', value: 'sculpture'},
        ],
      },
    },

    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    },

    {
      name: 'featured',
      title: 'Featured Work',
      type: 'boolean',
      initialValue: false,
    },

    {
      name: 'completedAt',
      title: 'Completion Date',
      type: 'date',
    },

    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Optional link to exhibition, Behance, etc.',
    },

    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      subtitle: 'category',
    },
  },
}
