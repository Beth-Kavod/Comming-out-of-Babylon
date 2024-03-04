"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

// Components
import Video from "@/components/gallery/Video"

export default function Gallery() {
  const [videoIndex, setVideoIndex] = useState("")
  const [videoData, setVideoData] = useState([])
  const [search, setSearch] = useState("")
  
  function callMedia() {
    fetch(`api/videos/search?videoID=${videoIndex}&search=${search}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      setVideoData(() => res.data || [])
      console.log(res.data)
    })
    .catch(error => console.error('Error fetching media:', error));
  }

  function handleChange(event) {
    event.preventDefault()
    setVideoIndex(parseInt(event.target.value))
  }

  function handleSearchChange(event) {
    event.preventDefault()
    setSearch(event.target.value)
    console.log(search)
  }


  return (
    <main className={styles.main}>
      <div className="formGroup">
        <label htmlFor="search">Search</label>
        <input type="text" id="search" onChange={handleSearchChange} />
      </div>
      <div className="formGroup">
        <label htmlFor="imageID">ImageID</label>
        <input type="text" id="imageID" onChange={handleChange} />
      </div>
      <button onClick={() => callMedia()}>Call media</button>
      <div className={styles.container} id="gallery">
        { !!videoData.length ?
          videoData.map(video => {
            return <Video key={video.thumbnail} params={{ video }} />
          })
          : null 
        }
      </div>
    </main>
  );
}
