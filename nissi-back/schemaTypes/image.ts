import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageAsset',
  title: 'Imagen',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true, // Permite ajustar el punto focal de la imagen
      },
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description: 'Descripción de la imagen para accesibilidad',
    }),
  ],
  preview: {
    select: {
      image: 'image',
    },
    prepare({image}) {
      return {
        title: 'Imagen',
        media: image,
      }
    },
  },
})