"use client"
import Image from "next/image";
import styles from "../gallery.module.css";
import { useState, useEffect, useMemo } from "react";

// Components
import Audio from "@/components/gallery/Audio"

export default function AudioGallery() {
  const [audioData, setAudioData] = useState([])
  const [fetchParams, setFetchParams] = useState({
    search: "",
    audioIndex: ""
  })

  const memoizedAudioData = useMemo(() => audioData, [audioData]);
  
  function submitForm(event) {
    event.preventDefault()

    callMedia()
    console.log("fetched videos")
  }

  function callMedia() {
    fetch(`/api/search/audio?videoID=${fetchParams.videoIndex}&search=${fetchParams.search}`, {
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

  function handleInputChange(event) {
    event.preventDefault()

    const { name, value } = event.target
    setFetchParams(prev => ({
      ...prev,
      [name]: value
    }))
  }
/* 
  useEffect(() => {
    console.log(fetchParams)
  }, [fetchParams])
 */
  return (
    <main className={styles.main}>
      <form onSubmit={submitForm} action="">
        <div className="formGroup">
          <label htmlFor="search">Search</label>
          <input type="text" id="search" name="search" onChange={handleInputChange} />
        </div>
        <div className="formGroup">
          <label htmlFor="audioID">audioID</label>
          <input type="text" id="audioID" name="audioIndex" onChange={handleInputChange} />
        </div>
        <input type="submit" value="Submit" />
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
