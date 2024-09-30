import React, { useState } from "react";

export const SpotifyPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([
    { id: 1, name: "Coding Focus", artist: "Lo-Fi Beats" },
    { id: 2, name: "Productivity Boost", artist: "Ambient Sounds" },
    { id: 3, name: "Debugging Tunes", artist: "Electronic Chill" },
  ]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!currentTrack) {
      setCurrentTrack(playlist[0]);
    }
  };

  const nextTrack = () => {
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Spotify Player</h2>
      {currentTrack ? (
        <div className="mb-4">
          <p className="font-bold">{currentTrack.name}</p>
          <p className="text-gray-600">{currentTrack.artist}</p>
        </div>
      ) : (
        <p className="mb-4">No track selected</p>
      )}
      <div className="space-x-2 mb-4">
        <button
          onClick={togglePlay}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={nextTrack}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      <div className="text-left">
        <h3 className="font-bold mb-2">Playlist:</h3>
        <ul>
          {playlist.map((track) => (
            <li
              key={track.id}
              className="cursor-pointer hover:text-green-500"
              onClick={() => setCurrentTrack(track)}
            >
              {track.name} - {track.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
