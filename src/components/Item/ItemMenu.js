import React, { useState, useRef, useEffect } from 'react';
import MenuHandle from "../MenuHandle.js";
import Video from "../Video.js";
import '../../scss/ItemMenu.scss';
import more from '../../media/icons/more.svg';

let allVideos = [];

function ItemMenu({ menuInfo, menuType }) {

  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  // create a ref so that the state can be accessed
  // within useEffect (because the component doesn't)
  const videoIsPlayingRef = useRef();
  videoIsPlayingRef.current = videoIsPlaying;

  // called when a menu is closed (if videos are playing)
  function pauseVideos() {
    if (videoIsPlayingRef.current) {
      allVideos.forEach(video => video.pause());
      console.log('pauseVideos ran');
    }
  }

  useEffect(() => {
    // get all videos (for the purpose of pausing them)
    allVideos = document.querySelectorAll('video');

    // when clicking the body...
    document.addEventListener('click', function(e) {
      // get open menu (if there is one)
      const openMenu = document.querySelector('.menu[open]');
      // get the element that was clicked on
      const target = e.target;
      // if there is an open menu, and the clicked element is not within a menu
      if (openMenu && !target.closest('.menu-contents')) {
        // close the open menu
        openMenu.removeAttribute("open");
        // pause all videos
        // ⚠️ I don't understand why this doesn't work without the ref
        pauseVideos();
      }
    });
  });

  // ⚠️ without this function the menus don't close
  // if you click on their handle a second time
  function handleClick(e) {
    if (e.currentTarget.parentElement.hasAttribute('open')) {
      e.stopPropagation();
      // pause all videos
      pauseVideos();
    }
  }

  return (
    <details className="menu">
      <MenuHandle type={"icon"} label={more} handleClick={handleClick} />
      <div className={"menu-contents " + menuType}>
        { menuType === 'ingredients-menu' ?
          <ul>
            <li>View picture</li>
            <li>Substitute</li>
            <li>More information</li>
          </ul> :
          <Video
            title={menuInfo.video.title}
            webm={menuInfo.video.webM}
            mp4={menuInfo.video.mp4}
            setVideoIsPlaying={setVideoIsPlaying}
          />
        }
      </div>
    </details>
  );
}

export default ItemMenu;
