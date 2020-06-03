class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleClick = this.handleClick.bind(this);
    this.postOrder = this.postOrder.bind(this);
  } // handleClick(data) {
  //   console.log('updating');
  //   this.setState(data);
  // }


  handleClick(e, data) {
    if (!data) {
      this.setState({
        currentForm: 'F1'
      });
    } else {
      this.setState(data);
    }
  }

  postOrder(e) {
    let data = {};

    for (let item in this.state) {
      if (item !== 'currentForm') {
        data[item] = this.state[item];
      }
    }

    fetch('http://127.0.0.1:3000/post', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log('got it');
      console.log('yippee');
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    let currentForm = this.state.currentForm;
    let formComponent = !currentForm ? /*#__PURE__*/React.createElement("button", {
      name: "checkout",
      className: "checkout",
      onClick: this.handleClick
    }, "Checkout") : currentForm === 'F1' ? /*#__PURE__*/React.createElement(F1, {
      handleClick: this.handleClick
    }) : currentForm === 'F2' ? /*#__PURE__*/React.createElement(F2, {
      handleClick: this.handleClick
    }) : currentForm === 'F3' ? /*#__PURE__*/React.createElement(F3, {
      handleClick: this.handleClick
    }) : /*#__PURE__*/React.createElement(Confirm, {
      data: this.state,
      sendData: this.postOrder
    });
    return /*#__PURE__*/React.createElement("div", null, formComponent);
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
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleClick(e, this.state);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name",
      value: this.state.name,
      placeholder: "Name...",
      onChange: this.handleChange,
      autoFocus: true,
      required: true
    }), /*#__PURE__*/React.createElement("input", {
      type: "email",
      name: "email",
      value: this.state.email,
      placeholder: "Email...",
      onChange: this.handleChange,
      required: true
    }), /*#__PURE__*/React.createElement("input", {
      type: "password",
      name: "password",
      value: this.state.password,
      placeholder: "Create Password...",
      onChange: this.handleChange,
      required: true
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Next"
    })));
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
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleClick(e, this.state);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "address1",
      onChange: this.handleChange,
      placeholder: "Address Line 1",
      required: true
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "address2",
      onChange: this.handleChange,
      placeholder: "Address Line 2"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "city",
      onChange: this.handleChange,
      placeholder: "City"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "state",
      onChange: this.handleChange,
      placeholder: "State"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "zip",
      onChange: this.handleChange,
      placeholder: "ZIP code"
    }), /*#__PURE__*/React.createElement("input", {
      type: "tel",
      name: "tel",
      onChange: this.handleChange,
      placeholder: "Phone #"
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Next"
    })));
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
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleClick(e, this.state);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "cardNum",
      value: this.state.ccNum,
      onChange: this.handleChange,
      placeholder: "Credit Card #"
    }), /*#__PURE__*/React.createElement("input", {
      type: "date",
      name: "expDate",
      value: this.state.expDate,
      onChange: this.handleChange,
      placeholder: "Date"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "cvv",
      value: this.state.cvv,
      onChange: this.handleChange,
      placeholder: "CVV"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "billingZIP",
      value: this.state.billingZIP,
      onChange: this.handleChange,
      placeholder: "Billing ZIP"
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Next"
    })));
  }

}

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.sendData();
  }

  render() {
    let tableElements = [];

    for (let item in this.props.data) {
      if (item !== 'currentForm' && item !== 'password') {
        tableElements.push( /*#__PURE__*/React.createElement("tr", {
          key: Math.random()
        }, /*#__PURE__*/React.createElement("th", null, item), /*#__PURE__*/React.createElement("td", null, this.props.data[item])));
      }
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "main"
    }, /*#__PURE__*/React.createElement("h1", null, "Confirm your Order"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("strong", null, "PLEASE REVIEW YOUR ORDER INFO")), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tbody", null, tableElements)), /*#__PURE__*/React.createElement("button", {
      className: "confirm",
      onClick: this.handleClick
    }, "Place Order"));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));
