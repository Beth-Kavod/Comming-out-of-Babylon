import Image from 'next/image'

export default function Photo({ params }) {
  const { photo } = params
  return (
    <div>
      <h4>{photo.title}</h4>
      <Image 
        src={photo.source}
        alt={photo.title}
        width="auto"
        height="500px"
      />
    </div>
  )
}