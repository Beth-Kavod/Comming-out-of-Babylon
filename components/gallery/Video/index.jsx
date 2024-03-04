import styles from "./page.module.css"
export default function Video({ params }) {
  const { video } = params
  return (
    <div className={styles.container}>
      <h4>{video.title}</h4>
      <video
        id="videoPlayer"
        width="70%"
        muted={false}
        className={styles.videoPlayer}
        poster={video.thumbnail}
        src={video.source}
        controls
        loop
      >
        <source type="video/mp4" />
      </video>
    </div>
  )
}