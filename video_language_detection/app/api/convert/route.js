
import fs from "fs"
import { resolve } from "path"
import { Readable } from "stream"
import ytdl from "ytdl-core"
// const downloader = new Downloader({
//     getTags: true,
//   });

export async function POST(req){

    // const startTime = 0;  // Replace with the start time in seconds
    // const duration = 15;   // Replace with the desired duration in seconds
    // const outputStream = fs.createWriteStream('output.mp3');





    const body = await req.json()
        try {
            const audio = ytdl(body.url,{filter: 'audioonly', format: "mp3"})
            const write =  audio.pipe(fs.createWriteStream('audio.mp3').on('finish', ()=>{
                fs.mkdirSync('output')
                const inputFileBuffer =  fs.readFileSync('audio.mp3')
                // console.log(inputFileBuffer);
                const fileSize = fs.statSync('audio.mp3').size;
                console.log('yeah', fileSize);

                const audioInfo =  ytdl.getInfo(body.url);
                const { sample_rate, bitrate, channels } = audioInfo.formats[0];
                const chunkSize = Math.ceil((bitrate / 8) * channels * (chunkDuration / 1000) * sample_rate); // Approximate chunk size based on duration (in bytes)
                const numChunks = Math.ceil(fileSize / chunkSize);
                for (let i = 0; i < numChunks; i++) {
                    const start = i * chunkSize;
                    const end = Math.min(start + chunkSize, fileSize);
                    const chunkData = inputFileBuffer.slice(start, end);

                
                    const outputFilePath = `output/split-${i + 1}.mp3`;
                
                    // Write the chunk to the output file
                    fs.writeFileSync(outputFilePath, chunkData);
                  }
            }))

                
    
    

            

            
            const res = {message: 'done'}
            const myOptions = { status: 200};
            return new Response(JSON.stringify(res), myOptions)
        } catch (error) {
            console.log(error);
            const res = {message: 'something wrong'}
            const myOptions = { status: 400};
            return new Response(JSON.stringify(res), myOptions)
        }
}