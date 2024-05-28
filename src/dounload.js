import ytdl from 'ytdl-core';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'https://www.youtube.com/watch?v=';

const YOUTUBE_ID = 'bnc1NjaXXXX';

const url = `${BASE_URL}${YOUTUBE_ID}`;

const video = ytdl(url);

video.pipe(fs.createWriteStream(path.resolve(__dirname, `./tmp/${YOUTUBE_ID}.mp4`)));

video.on('end', () => {
    console.log('file downloaded.');
});
