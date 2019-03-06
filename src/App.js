import React, { Component } from 'react';
import './App.css';

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
    this.setState({uploadType:event.target.value})
  }

  setTitle = (event) => {
    this.setState({title:event.target.value})
  }

  setUrlpostfix = (event) => {
    this.setState({urlpostfix:event.target.value})
  }

  setDate = (event) => {
    this.setState({date:event.target.value})
  }

  setPreview = (event) => {
    this.setState({preview:event.target.value})
  }

  setContent = (event) =>{
    this.setState({content:event.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Joe Mercer Blog Upload Tool
          <div className="App-subheader" onChange={this.setUploadType.bind(this)}>
            <input type="radio" value="post" name="gender"/> Post
            <input type="radio" value="project" name="gender"/> Project
          </div>
        </header>
        <div className="editor">
          <div>Title</div>
          <input></input>
          <div>URL Postfix</div>
          <input></input>
          { this.state.uploadType === 'post' &&
            <>
              <div>Date</div>
              <input value={this.state.date}></input>
            </>
          }
          <div>Preview</div>
          <input></input>
          <div>Content</div>
          <textarea/>
          <br/>
          <button>Upload</button>
        </div>
      </div>
    );
  }
}

export default App;
