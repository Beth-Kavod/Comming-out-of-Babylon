"use client"
import Image from "next/image";
import styles from "../gallery.module.css";
import { useState, useEffect, useMemo } from "react";

// Components
import Photo from "@/components/gallery/Photo"
import SearchForm from "@/components/forms/SearchForm";

export default function PhotoGallery() {
  const [videoData, setVideoData] = useState([])
  const [fetchParams, setFetchParams] = useState({
    search: "",
    mediaId: ""
  })

  const memoizedImageData = useMemo(() => videoData, [videoData]);
  
  function submitForm(event) {
    event.preventDefault()

    callMedia()
  }
  
  function callMedia() {
    fetch(`/api/search/photos?mediaId=${fetchParams.mediaId}&search=${fetchParams.search}`, {
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
