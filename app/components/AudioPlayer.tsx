'use client';

import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Play, Pause } from 'lucide-react';
import { Button } from './ui/Button';
import { Slider } from './ui/Slider';

interface YouTubeAudioPlayerProps {
  url: string;
}

export default function YouTubeAudioPlayer({ url }: YouTubeAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    setProgress(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (newValue: number[]) => {
    const [seekTime] = newValue;
    playerRef.current?.seekTo(seekTime);
    setProgress(seekTime);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-xl">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        height="0"
        width="0"
        onProgress={handleProgress}
        onDuration={handleDuration}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
        }}
      />
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={handlePlayPause}
          variant="outline"
          size="icon"
          className="w-10 h-10"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <div className="text-sm font-medium text-gray-700">
          {formatTime(progress)} / {formatTime(duration)}
        </div>
      </div>
      <Slider
        value={[progress]}
        max={duration}
        step={0.1}
        onValueChange={handleSeek}
        className="w-full"
      />
    </div>
  );
}
