class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return <div className="timer">
    </div>;
  }
}

class Model {
  constructor() {
    this.players = [
      {
        name: "Gustavo Paz",
        coment: "El siguiente proyecto es Interesante",
        id: 1,
      },
      {
        name: "Daniel Linares",
        coment: "Participare en la siguiente HACKATON",
        id: 2,
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

  newPlayes() {
    return model.players.length;
  }

  addPlayer(name, coment) {
    console.log(name.value);
    this.players.push({
      name: this.input.value,
      coment: this.input.value,
    })
    this.callback();
    this.notify();
  }
}

const Header = (props) => {
  return (
    <div className="header">
      <div className="col-md-8">
        <p>PLAYERS:{model.newPlayes()}</p>
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
            <div className="player-count" >{item.coment} </div>
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
          model.addPlayer(coment);


        }}
        >
          <input onChange={e => (model.input = e.target)} type="text" placeholder="NOMBRE" /><br />
          <input onChange={e => (model.input = e.target)} type="text" placeholder="NUEVO COMENTARIO" /><br />
          <input type="submit" value="Add" />
        </form>
      </div>
    )
  }
})

const Application = ({ title, model }) => {
  return (
    <div className="scoreboard">
      <PlayerForm />
      <Header model={model} />
      <PlayerList model={model} />
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
