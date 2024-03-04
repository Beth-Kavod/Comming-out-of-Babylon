"use client"
import Image from "next/image";
import styles from "../gallery.module.css";
import { useState, useEffect, useMemo } from "react";

// Components
import Audio from "@/components/gallery/Audio"
import SearchForm from "@/components/forms/SearchForm"

export default function AudioGallery() {
  const [audioData, setAudioData] = useState([])
  const [fetchParams, setFetchParams] = useState({
    search: "",
    mediaId: ""
  })

  const memoizedAudioData = useMemo(() => audioData, [audioData]);
  
  function submitForm(event) {
    event.preventDefault()

    callMedia()
    console.log("fetched videos")
  }

  function callMedia() {
    fetch(`/api/search/audio?mediaId=${fetchParams.mediaId}&search=${fetchParams.search}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      setAudioData(() => res.data || [])
      console.log(res.data)
    })
    .catch(error => console.error('Error fetching media:', error));
  }

  return (
    <main className={styles.main}>
      <form onSubmit={submitForm} action="">
        <SearchForm params={{ fetchParams, setFetchParams }} />
      </form>
      <div className={styles.container} id="gallery">
        { !!memoizedAudioData.length ?
          memoizedAudioData.map(video => {
            return <Audio key={video.thumbnail} params={{ video }} />
          })
          : null 
        }
      </div>
    </main>
  );
}
