class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDocId: '',
      currentForm: '',
      name: '',
      email: '',
      password: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      tel: '',
      cardNum: '',
      expDate: '',
      cvv: '',
      billingZIP: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.postOrder = this.postOrder.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleClick(e, data) {
    if (!data) {
      this.postOrder(e);
      this.setState({ currentForm: 'F1' });
    } else {
      this.setState({ currentForm: data.currentForm }, this.postOrder(e, data));
    }
  }

  postOrder(e, data) {
    console.log('sending');
    let payload = this.state;
    console.log('theres data', data);
    if (data) {
      delete data.currentForm;
      data.currentDocId = this.state.currentDocId;
      payload = data;
      this.setState(data);
    } else {
      delete payload.currentForm;
    }

    fetch('http://127.0.0.1:3000/post', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ currentDocId: data.new });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  reset() {
    let stateObj = this.state;

    for (let item in stateObj) {
      stateObj[item] = '';
    }
    this.setState(stateObj);
  }

  render() {
    let currentForm = this.state.currentForm;
    let formComponent = !currentForm ? (
      <button name="checkout" className="checkout" onClick={this.handleClick}>
        Checkout
      </button>
    ) : currentForm === 'F1' ? (
      <F1 handleClick={this.handleClick} />
    ) : currentForm === 'F2' ? (
      <F2 handleClick={this.handleClick} />
    ) : currentForm === 'F3' ? (
      <F3 handleClick={this.handleClick} />
    ) : (
      <Confirm data={this.state} reset={this.reset} />
    );
    return <div>{formComponent}</div>;
  }
}

class F1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'F2',
      name: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleClick(e, this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Name..."
            onChange={this.handleChange}
            autoFocus
            required
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Email..."
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Create Password..."
            onChange={this.handleChange}
            required
          />
          <input type="submit" value="Next" />
        </form>
      </div>
    );
  }
}

class F2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'F3',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      tel: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleClick(e, this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="address1"
            onChange={this.handleChange}
            placeholder="Address Line 1"
            required
          />
          <input
            type="text"
            name="address2"
            onChange={this.handleChange}
            placeholder="Address Line 2"
          />
          <input
            type="text"
            name="city"
            onChange={this.handleChange}
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            onChange={this.handleChange}
            placeholder="State"
          />
          <input
            type="text"
            name="zip"
            onChange={this.handleChange}
            placeholder="ZIP code"
          />
          <input
            type="tel"
            name="tel"
            onChange={this.handleChange}
            placeholder="Phone #"
          />
          <input type="submit" value="Next" />
        </form>
      </div>
    );
  }
}

class F3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'Confirm',
      cardNum: '',
      expDate: '',
      cvv: '',
      billingZIP: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleClick(e, this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="cardNum"
            value={this.state.ccNum}
            onChange={this.handleChange}
            placeholder="Credit Card #"
          />
          <input
            type="date"
            name="expDate"
            value={this.state.expDate}
            onChange={this.handleChange}
            placeholder="Date"
          />
          <input
            type="text"
            name="cvv"
            value={this.state.cvv}
            onChange={this.handleChange}
            placeholder="CVV"
          />
          <input
            type="text"
            name="billingZIP"
            value={this.state.billingZIP}
            onChange={this.handleChange}
            placeholder="Billing ZIP"
          />
          <input type="submit" value="Next" />
        </form>
      </div>
    );
  }
}

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.reset();
  }

  render() {
    let tableElements = [];
    for (let item in this.props.data) {
      if (
        item !== 'currentForm' &&
        item !== 'password' &&
        item !== 'currentDocId'
      ) {
        tableElements.push(
          <tr key={Math.random()}>
            <th>{item}</th>
            <td>{this.props.data[item]}</td>
          </tr>
        );
      }
    }
    return (
      <div className="main">
        <h1>Confirm your Order</h1>

        <h2>
          <strong>PLEASE REVIEW YOUR ORDER INFO</strong>
        </h2>

        <table>
          <tbody>{tableElements}</tbody>
        </table>
        <button className="confirm" onClick={this.handleClick}>
          Purchase
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
