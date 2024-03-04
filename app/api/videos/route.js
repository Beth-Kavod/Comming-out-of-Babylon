import Cors from 'cors';
import { NextResponse } from "next/server"
import { returnArraySlice } from "@/utils/routeMethods"
import dotenv from 'dotenv'
dotenv.config()

export async function GET(request) {
  try {
    /* const cors = Cors({
      methods: ['GET', 'OPTIONS'], // Allow only GET and OPTIONS methods
    });
     */
    const searchParams = request.nextUrl.searchParams
    const videoID = searchParams.get('videoID') || 0
    const limit = searchParams.get('limit') || 10


    const fetchVideos = await fetch(`http://${process.env.SERVER_IP}/library/sections/1/all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Plex-Token': process.env.PLEX_TOKEN,
        // 'Access-Control-Allow-Methods': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      }
    })

    const videosJson = await fetchVideos.json();

    const videosData = videosJson.MediaContainer.Metadata.map(video => {
      return {
        thumbnail: `http://${process.env.SERVER_IP}${video.thumb}`/* ?X-Plex-Token=${process.env.PLEX_TOKEN} */,
        source: `http://${process.env.SERVER_IP}${video.Media[0].Part[0].key}` /* ?X-Plex-Token=${process.env.PLEX_TOKEN} */,
        title: video.title
      }
    })

    // const filteredData = videosData.filter(video => video.title === videoID);

    if (videoID) {
      return NextResponse.json({
        success: true,
        message: "Fetched all videos from server",
        data: returnArraySlice(videosData, videoID, limit)
      }, {
        status: 200
      })  
    } else { 
      
      return NextResponse.json({
        success: true,
        message: "Fetched all videos from server",
        data: returnArraySlice(videosData, videoID, limit)
      }, {
        status: 200
      })
    }
    
  } catch {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch all videos from server"
    }, {
      status: 500
    })
  }
}