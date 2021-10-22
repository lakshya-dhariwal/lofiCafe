import React from "react";
import LibrarySong from "./librarySong";

const Library = ({libraryStatus,isPlaying,setSongs,audioRef,songs, setCurrentSong})=>{
    return(
        <div className={`library ${libraryStatus ? 'active-library':""}`}>
            <h2>Library</h2>
            <div className="library-songs">
             {songs.map(song=> 
                <LibrarySong 
                songs={songs} 
                song={song}
                setCurrentSong={setCurrentSong} 
                id={song.id}
                key={song.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs} />)
              }
            </div>
        </div>
    )
}

export default Library;