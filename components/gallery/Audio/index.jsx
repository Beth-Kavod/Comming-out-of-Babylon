import styles from "./page.module.css"
export default function Audio({ params }) {
  const { audio } = params
  return (
    <div className={styles.container}>
      <h4>{audio.title}</h4>
      <audio
        id="audioPlayer"
        width="70%"
        muted={false}
        className={styles.audioPlayer}
        poster={audio.thumbnail}
        controls
        loop
      >
        <source src={audio.source} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  )
}