import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

export const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={`${basePath || ''}${src}`} {...rest} />
)
