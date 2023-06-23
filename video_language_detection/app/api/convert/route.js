import fs from "fs"
import ytdl from "ytdl-core"
import {convert} from "video-to-audio"
import path from "path";

export async function POST(request){

    const body = await request.json()
        try {
            ytdl(body.url)
            .pipe(fs.createWriteStream('video.mp4'))
            const video =   fs.readFileSync('video.mp4')
            console.log('yyoooow', video)
            let convertedAudioDataObj = await convert(video, "mp3")
            console.log('yyoooow2', convertedAudioDataObj)
            const res = {message: 'done', video: video}
            const myOptions = { status: 200};
            return new Response(JSON.stringify(res), myOptions)
        } catch (error) {
            const res = {message: 'something wrong'}
            const myOptions = { status: 400};
            return new Response(JSON.stringify(res), myOptions)
        }
}