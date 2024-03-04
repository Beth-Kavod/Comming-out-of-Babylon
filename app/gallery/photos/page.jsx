"use client"
import Image from "next/image";
import styles from "../gallery.module.css";
import { useState, useEffect, useMemo } from "react";

// Components
import Video from "@/components/gallery/Video"

export default function PhotoGallery() {
  const [videoData, setVideoData] = useState([])
  const [fetchParams, setFetchParams] = useState({
    search: "",
    imageIndex: ""
  })

  const memoizedImageData = useMemo(() => videoData, [videoData]);
  
  function submitForm(event) {
    event.preventDefault()

    callMedia()
  }
  
  function callMedia() {
    fetch(`/api/search/photos?videoID=${fetchParams.videoIndex}&search=${fetchParams.search}`, {
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

  function handleInputChange(event) {
    event.preventDefault()

    const { name, value } = event.target
    setFetchParams(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <main className={styles.main}>
      <form onSubmit={submitForm} action="">
        <div className="formGroup">
          <label htmlFor="search">Search</label>
          <input type="text" id="search" name="search" onChange={handleInputChange} />
        </div>
        <div className="formGroup">
          <label htmlFor="imageID">ImageID</label>
          <input type="text" id="imageID" name="imageIndex" onChange={handleInputChange} />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <div className={styles.container} id="gallery">
        { !!memoizedImageData.length ?
          memoizedImageData.map(video => {
            return <Photo key={video.thumbnail} params={{ video }} />
          })
          : null 
        }
      </div>
    </main>
  );
}
