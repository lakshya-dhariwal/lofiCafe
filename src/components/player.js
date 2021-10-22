import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay , faAngleRight , faAngleLeft , faPause } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";


const Player = ({songInfo,setSongs,id,setCurrentSong,songs, setSongInfo,audioRef,currentSong , isPlaying , setIsPlaying}) =>{
    //useEffect
    useEffect(()=>{
        const newSongs = songs.map((song)=>{
            if(song.id === id){
                return{
                    ...song,
                    active: true
                }
            }else{
                return{
                    ...song,
                    active:false
                }
            }});
        setSongs(newSongs);

    },[currentSong])
    //event handlers
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();  
            setIsPlaying(!isPlaying); 
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    
    const getTime= (time)=>{
        return(
            Math.floor(time/60) + ":" + ("0"+ Math.floor(time%60)).slice(-2)
        )
    }
    const dragHandler= (e)=>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo , currentTime: e.target.value});
    }
    const skipTrackHandler= async (direction) =>{p
        let currentIndex = songs.findIndex((song)=> song.id=== currentSong.id)
        if(direction==="skip-forward"){
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        };
        
        if(direction==="skip-back"){
            if((currentIndex -1) % songs.length=== -1){
                await setCurrentSong(songs[songs.length -1]);
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        };
        if(isPlaying) audioRef.current.play();
       
    }
    //state
   
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                min={0} max={songInfo.duration || 0} 
                value={songInfo.currentTime}
                onChange={dragHandler}
                type="range"  />
                <p>{songInfo.duration ? getTime(songInfo.duration): '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skipBack" onClick={()=> skipTrackHandler('skip-back')} size="2x" icon={faAngleLeft }/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon className="skipForward" onClick={()=> skipTrackHandler('skip-forward')} size="2x" icon={faAngleRight}/>
            </div>
            
        </div>
    )
}

export default Player ; 