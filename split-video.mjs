import fs from 'fs/promises';
import path from 'path';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
const VIDEO_PATH = './paole/59251975-1-192.mp4';
const OUTPUT_DIR = './paole/video';

async function splitVideo() {
    try {
        // 确保输出目录存在
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        // 读取视频文件
        const videoBuffer = await fs.readFile(VIDEO_PATH);
        const chunks = Math.ceil(videoBuffer.length / CHUNK_SIZE);

        // 切割并保存文件
        for (let i = 0; i < chunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, videoBuffer.length);
            const chunk = videoBuffer.slice(start, end);
            
            const fileName = `${(i + 1).toString().padStart(2, '0')}.bin`;
            await fs.writeFile(path.join(OUTPUT_DIR, fileName), chunk);
            console.log(`已生成: ${fileName}`);
        }

        console.log('视频切割完成！');
    } catch (error) {
        console.error('错误:', error);
    }
}

splitVideo();