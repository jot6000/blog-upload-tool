import React, { Component } from 'react';
import './App.css';
import passphrase from './passphrase'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      urlpostfix: '',
      date: new Date(),
      preview: '',
      content: '',
      uploadType: ''
    };
  }

  setUploadType = (event) => {
    this.setState({ uploadType: event.target.value })
  }

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value })
  }

  onChangeUrlpostfix = (event) => {
    var newValue = event.target.value;
    if (newValue.includes(' ')) {
      newValue = newValue.replace(' ', '')
      //change this to something that looks nicer than an alert and is less intrusive
      alert("URL Postfix cannot contain spaces");
    }

    this.setState({ urlpostfix: newValue })
  }

  onChangeDate = (event) => {
    this.setState({ date: event.target.value })
  }

  onChangePreview = (event) => {
    this.setState({ preview: event.target.value })
  }

  onChangeContent = (event) => {
    this.setState({ content: event.target.value })
  }

  upload = () => {
    console.log(this.state)
    var request = new XMLHttpRequest();
    var sendRequest;
    var Response;

    sendRequest = "title="+this.state.title+"&preview="+this.state.preview+"&urlpostfix="+this.state.urlpostfix+"&content="+this.state.content+"&date="+this.state.date+"&passphrase="+passphrase.passpharse;
    console.log(sendRequest)
  
    request.open('POST', 'https://joe-mercer-blog-backend.herokuapp.com/addPost',true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onload = function(){
        Response = this.response
        console.log(this.response)
    };
    request.send(sendRequest);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Joe Mercer Blog Upload Tool
          <div className="App-subheader" onChange={this.setUploadType.bind(this)}>
            <input type="radio" value="post" name="gender" /> Post
            <input type="radio" value="project" name="gender" /> Project
          </div>
        </header>
        <div className="editor">
          <div>Title</div>
          <input type='text' value={this.state.title} onChange={this.onChangeTitle}></input>
          <div>URL Postfix</div>
          <input type='text' value={this.state.urlpostfix} onChange={this.onChangeUrlpostfix}></input>
          {this.state.uploadType === 'post' &&
            <>
              <div>Date</div>
              <input type='date' value={this.state.date} onChange={this.onChangeDate}></input>
            </>
          }
          <div>Preview</div>
          <input type='text' value={this.state.preview} onChange={this.onChangePreview}></input>
          <div>Content</div>
          <textarea value={this.state.content} onChange={this.onChangeContent}/>
          <br />
          <button onClick={this.upload}>Upload</button>
          <button>Save to csv</button>
          <button>Import from csv</button>
        </div>
      </div>
    );
  }
}

export default App;
