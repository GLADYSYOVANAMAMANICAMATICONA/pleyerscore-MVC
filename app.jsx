class Modal {
  constructor(players_score) {
    this.players = [
      {
        name: "Jim Hoskins",
        score: 31,
        id: 1,
      },
      {
        name: "Andree Hoskins",
        score: 35,
        id: 2,
      },
      {
        name: "Alena Hoskins",
        score: 42,
        id: 3,
      },
    ];

    this.callback = null;
    this.inputAddPlayer = null;
  }

  subscribe(render) {
    this.callback = render;
  }

  notify() {
    this.callback();
  }

  addPlayer(name) {
    if(this.inputAddPlayer!= null && this.inputAddPlayer.value !=''){
    this.players.push({
      name: this.inputAddPlayer.value,
      score: 0,
      id: Utils.uuid()
    });

    this.notify();
    inputAddPlayer.value = '';
  }
}

  Aumentar(index) {
    if (this.players[index].score > 0) {
      this.players[index].score++;
      this.notify();
    }
  }

  Disminuir(index) {
    if (this.players[index].score > 0) {
      this.players[index].score--;
      this.notify();
    }
  }

  totalPoints(e, index, x) {
    this.players[index].score = this.players[index].score + x;
    this.notify();
  }

}

const PlayerScore = ({ title, model }) => {
  const Header = (//React.createClass---palabra reservada
    <div className="header">
      <div className="col-md-8">
        <p>PLAYERS:{modal.players.length}</p>
        <p>TOTAL POINTS:{modal.players.map(x => x.score).reduce((x,y)=> x+y )} </p>
      </div>

      <div className="col-md-4 stopwatch">
        <p>STOPWATH</p>
        <h1>0</h1>
        <button>ATART</button>
        <button>RESET</button>
      </div>
    </div>
  );



  const PlayerList = (//React.createClass---palabra reservada
    <div >
      {
        modal.players.map((players, index) => {//players--objeto del array
          return (
            <div className="player">
              <div className="player-name " >
                <div key={index}> {players.name} </div>
              </div>
              <div className="player-score counter ">

                <button className="counter-action decrement" onclick={e => { modal.totalPoints(e, index, -1) }}>-</button>
                <div key={index}> {players.score} </div>
                <button className="counter-action increment" onclick={e => { modal.totalPoints(e, index, 1) }}>+</button>
              </div>
            </div>
          );
        })
      }
    </div>
  );

  const PlayerForm = (//React.createClass---palabra reservada
    <div>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        modal.addPlayer(modal.inputAddPlayer);
      }}
      >
        <input onChange={e => (modal.inputAddPlayer = e.target)} type="text" placeholder="NOMBRE" />
        <input type="submit" value="Player" />
      </form>
    </div>
  );
  return (
    <div>
      <div className="scoreboard">
        {Header}
        {PlayerList}
        {PlayerForm}
      </div>
    </div>
  );
};
let new_players_score = [];
let modal = new Modal();
let counter = 1;
let render = () => {
  ReactDOM.render(<PlayerScore title="Scoreboard" players={modal} />, document.getElementById('container'));
};
modal.subscribe(render);
render();