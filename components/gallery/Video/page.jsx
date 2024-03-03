function Video({ params }) {
  const { videoData } = params
  return (
    <video 
      id="videoPlayer" 
      width="70%" 
      muted="false" 
      poster={videoData.thumbnail}
      src={videoData.source} 
      controls 
      loop 
    >
      <source type="video/mp4" />
    </video>
  )
}