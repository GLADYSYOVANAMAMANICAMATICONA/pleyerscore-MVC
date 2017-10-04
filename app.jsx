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

  totalPoints() {
    return model.players.map((e) => e.score).reduce((e, x) => { return e + x });
    this.notify();
    this.callback();

  }

  newPlayes() {
    return model.players.length;
  }

  addPlayer(name) {
    console.log(name.value);
    this.players.push({
      name: this.input.value,
      score: 0,

    })

    this.callback();
    this.notify();
  }

  aumentar(index) {
    this.players[index].score++;
    this.callback();
    this.notify();
  }

  disminuir(index) {
    this.players[index].score--;
    this.callback();
    this.notify();
  }
}

const Header = (props) => {
  return (
    <div className="header">
      <div className="col-md-8">
        <p>PLAYERS:{model.newPlayes()}</p>
        <p>TOTAL POINTS:{model.totalPoints()}</p>
      </div>

      <div className="col-md-4 stopwatch">
        <p>STOPWATH</p>
        <h1>0</h1>
        <button>ATART</button>
        <button>RESET</button>
      </div>
    </div>
  )
}



const PlayerList = ({ model }) => {
  return (
    <div>{
      model.players.map((item, index) => {
        return (
          <div className="player">
            <div className="player-name " >{item.name}</div>
            <div className="player-score counter ">
              <button className="counter-action decrement btn" onClick={() => model.disminuir(index)} >-</button>
              <div className="counter-score" >{item.score} </div>
              <button className="counter-action increment" onClick={() => { model.aumentar(index) }}>+</button>
            </div>
          </div>
        )
      }
      )
    }
    </div>
  )
}



const PlayerForm = React.createClass({
  render: function () {
    return (
      <div className="add-player-form">
        <form onSubmit={e => {
          e.preventDefault();
          model.addPlayer(name);
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
    <div className="scoreboard">
      <Header model={model} />
      <PlayerList model={model} />
      <PlayerForm />
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