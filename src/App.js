import React, {useState, useEffect} from 'react';
import pop from './pop.mp3';

function App() {

  const [likes, setLikes] = useState(0);
  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
    onSubmit()
  }

  useEffect(() => {
    fetch('https://super-likes.herokuapp.com/like', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        likes: likes
      })
    })
    .then(response => response.json())
    .then(likes => setLikes(likes))
  }, []);

  const onSubmit = () => {
    fetch('https://super-likes.herokuapp.com/liked', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        likes: likes
      })
    })
    .then(response => response.json())
    .then(likes => setLikes(likes))
  }

  return (
    <div>
      <p>{likes}</p>
      <i className="fa fa-thumbs-up" aria-hidden="true" onClick={playAudio} ></i>
      <h2>Super L<strong>i</strong>ke <i className="fa fa-heart" aria-hidden="true"></i></h2>
      <audio className="audio-element">
          <source src={pop}></source>
      </audio>
    </div>
  );
}

export default App;
