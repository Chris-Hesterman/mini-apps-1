class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'F3'
    };
  }

  render() {
    let currentForm = this.state.currentForm;
    let formComponent = !currentForm ? (
      ''
    ) : currentForm === 'F1' ? (
      <F1 />
    ) : currentForm === 'F2' ? (
      <F2 />
    ) : (
      <F3 />
    );
    return (
      <div>
        <button>Checkout</button>
        <div>{formComponent}</div>
      </div>
    );
  }
}

class F1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextForm: 'F2',
      name: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <form>
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
          <button>Next</button>
        </form>
      </div>
    );
  }
}

class F2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
          <button>Next</button>
        </form>
      </div>
    );
  }
}

class F3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: '',
      expDate: '',
      cvv: '',
      billingZIP: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <form>
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
          <button>Next</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
