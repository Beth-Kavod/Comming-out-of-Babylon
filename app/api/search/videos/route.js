import { NextResponse } from "next/server"
import { returnArraySlice } from "@/utils/routeMethods"
import dotenv from 'dotenv'
dotenv.config()

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    const mediaId = parseInt(searchParams.get('mediaId')) || 0
    const limit = parseInt(searchParams.get('limit')) || 10

    const search = searchParams.get('search') || ""
    const searchRegex = new RegExp(search, 'i')


    const fetchVideos = await fetch(`http://${process.env.SERVER_IP}/library/sections/1/all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Plex-Token': process.env.PLEX_TOKEN,
      }
    })

    const videosJson = await fetchVideos.json();

    const videosData = videosJson.MediaContainer.Metadata.map(video => {
      return {
        thumbnail: `http://${process.env.SERVER_IP}${video.thumb}?X-Plex-Token=${process.env.PLEX_TOKEN}`,
        source: `http://${process.env.SERVER_IP}${video.Media[0].Part[0].key}?X-Plex-Token=${process.env.PLEX_TOKEN}`,
        title: video.title
      }
    })

    // Search data with Regex
    const filteredData = videosData.filter(video => {
      return searchRegex.test(video.title) || searchRegex.test(video.source) || searchRegex.test(video.thumbnail);
    });

    const returnedData = () => {
      const slicedArray = returnArraySlice(filteredData, mediaId, limit)
      return !!slicedArray.length ? slicedArray : `No videos found that match: ${search}` 
    }

    return NextResponse.json({
      success: true,
      message: `Fetched all videos from server with regex: ${search}`,
      data: returnedData()
    }, {
      status: 200
    })    
  } catch {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch all videos from server"
    }, {
      status: 500
    })
  }
}