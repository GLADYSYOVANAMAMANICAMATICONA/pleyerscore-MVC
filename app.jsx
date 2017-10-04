class Model {
  constructor() {
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
  }

  subscribe(render) {
    this.callback = render;
  }

  notify() {
    this.callback();
  }

  addPlayer(name) {
    if (this.input != null && this.input.value != ' ') {
      this.players.push({
        name: this.input.value,
        score: 0,
        id: Utils.uuid()
      });

      this.notify();
      input.value = '';
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
    return model.players.map((e) => e.score).reduce((e, x) => { return e + x });
    this.notify();
  }

  nuevoPlayes() {
    return model.players.length;
  }

}



const Header = (props) => {//React.createClass---palabra reservada
  return (
    <div className="header">
      <div className="col-md-8">
        <p>PLAYERS:{model.nuevoPlayes()}</p>
        <p>TOTAL POINTS:{model.totalPoints()}</p>
      </div>

      <div className="col-md-4 stopwatch">
        <p>STOPWATH</p>
        <h1>0</h1>
        <button>ATART</button>
        <button>RESET</button>
      </div>
    </div>
  );
}



const PlayerList = React.createClass({
  render: function () {
    return (//React.createClass---palabra reservada
      <div >
        {
          model.players.map((item, index) => {//players--objeto del array
            return (
              <div className="player">
                <div className="player-name " >
                  <div >{item.name} </div>
                </div>
                <div className="player-score counter ">

                  <button className="counter-action decrement btn" onClick={() => model.Disminuir(index)} >-</button>
                  <div >{item.score} </div>
                  <button className="counter-action increment" onClick={() => { model.Aumentar(index) }}>+</button>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
})

const PlayerForm = React.createClass({
  render: function () {
    return (
      <div>
        <form className="form" onSubmit={e => {
          e.preventDefault();
          model.addPlayer(model.inputAddPlayer);
        }}
        >
          <input onChange={e => (model.input = e.target)} type="text" placeholder="NOMBRE" />
          <input type="submit" value="Player" />
        </form>
      </div>
    )
  }
})


const Application = ({ title, model }) => {
  return (
    <div>
      <div className="scoreboard">
        <Header/>
        <PlayerList/>
        <PlayerForm/>
      </div>
    </div>
  );
}

let model = new Model();
let counter = 1;

let render = () => {
  ReactDOM.render(<Application title="Scoreboard" model={model} />,
   document.getElementById('container')
  );
};
model.subscribe(render);
render();