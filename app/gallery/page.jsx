import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [videoData, setVideoData] = useState({
    source: "",
    thumbnail: ""
  })
  
  function callMedia() {
    fetch(`http://192.168.1.18:32400/library/sections/1/all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Plex-Token': 'AEazHy_Cth5dM57DVpXS'
      }
    })
    .then(res => res.json())
    .then(res => {
      // Assuming the first video in the response
      const absoluteVideoUrl = res.MediaContainer.Metadata[1].Media[0].Part[0].key;
      const absolutePreviewUrl = res.MediaContainer.Metadata[1].art;
      setVideoData(() => ({
        source: `http://192.168.1.18:32400${absoluteVideoUrl}?X-Plex-Token=AEazHy_Cth5dM57DVpXS`,
        thumbnail: `http://192.168.1.18:32400${absolutePreviewUrl}?X-Plex-Token=AEazHy_Cth5dM57DVpXS`
      }))
    })
    .catch(error => console.error('Error fetching media:', error));
  }
  return (
    <main className={styles.main}>
      <div class="container">
        <Video params={{ videoData }} />
        <button onclick={() => callMedia()}>Call media</button>
      </div>
    </main>
  );
}
