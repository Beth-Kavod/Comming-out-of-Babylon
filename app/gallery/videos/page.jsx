"use client"
import Image from "next/image";
import styles from "../gallery.module.css";
import { useState, useEffect, useMemo } from "react";

// Components
import Video from "@/components/gallery/Video"
import SearchForm from '@/components/forms/SearchForm'

export default function VideoGallery() {
  const [videoData, setVideoData] = useState([])
  const [fetchParams, setFetchParams] = useState({
    search: "",
    mediaId: ""
  })

  const memoizedVideoData = useMemo(() => videoData, [videoData]);
  
  function submitForm(event) {
    event.preventDefault()

    callMedia()
    console.log("fetched videos")
  }
  
  function callMedia() {
    fetch(`/api/search/videos?mediaId=${fetchParams.mediaId}&search=${fetchParams.search}`, {
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

  return (
    <main className={styles.main}>
      <form onSubmit={submitForm} action="">
        <SearchForm params={{ fetchParams, setFetchParams }} />
      </form>
      <div className={styles.container} id="gallery">
        { !!memoizedVideoData.length ?
          memoizedVideoData.map(video => {
            return <Video key={video.thumbnail} params={{ video }} />
          })
          : null 
        }
      </div>
    </main>
  );
}
