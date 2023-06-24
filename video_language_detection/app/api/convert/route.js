import fs from "fs"
import ytdl from "ytdl-core"
import lame from 'node-lame'

// const downloader = new Downloader({
//     getTags: true,
//   });

export async function POST(request){

    const startTime = 0;  // Replace with the start time in seconds
    const duration = 15;   // Replace with the desired duration in seconds
    const outputStream = fs.createWriteStream('output.mp3');





    const body = await request.json()
        try {
            const audio = ytdl(body.url,{filter: 'audioonly', format: "mp3"})
            audio.pipe(fs.createWriteStream('audio.mp3'))
            

            console.log('yeah', audio);
            
            const res = {message: 'done'}
            const myOptions = { status: 200};
            return new Response(JSON.stringify(res), myOptions)
        } catch (error) {
            const res = {message: 'something wrong'}
            const myOptions = { status: 400};
            return new Response(JSON.stringify(res), myOptions)
        }
}