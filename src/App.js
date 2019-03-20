import React, { Component } from 'react';
import './App.css';
import passphrase from './passphrase'
import ReactMarkdown from 'react-markdown'
import ReactModal from 'react-modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      urlpostfix: '',
      date: new Date(),
      preview: '',
      content: '',
      uploadType: '',
      uploadOpen: false,
    };
  }

  setUploadType = (event) => {
    this.setState({ uploadType: event.target.value })
  }

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value })
  }

  openUpload = () => {
    if(this.state.uploadType === 'Post'||this.state.uploadType === 'Project'){
      this.setState({ uploadOpen: true })
    }
    else{
      //change this to something that looks nicer than an alert and is less intrusive
      alert("You need to specify if you are uploading a blog post or a project page.");
    }
  }

  closeUpload = () => {
    this.setState({ uploadOpen: false })
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

    if(this.state.uploadType === 'Post'){
      sendRequest = "title="+this.state.title+"&preview="+this.state.preview+"&urlpostfix="+this.state.urlpostfix+"&content="+this.state.content+"&date="+this.state.date+"&passphrase="+passphrase.passpharse;
      console.log(sendRequest)
    }
    else if(this.state.uploadType === 'Project'){
      sendRequest = "title="+this.state.title+"&preview="+this.state.preview+"&urlpostfix="+this.state.urlpostfix+"&content="+this.state.content+"&passphrase="+passphrase.passpharse;
      console.log(sendRequest)
    }

    request.open('POST', 'https://joe-mercer-blog-backend.herokuapp.com/add'+this.state.uploadType,true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onload = function(){
        Response = this.response
        console.log(this.response)
    };
    request.send(sendRequest);
    this.closeUpload()
    this.setState({title: '',urlpostfix: '',date: new Date(),preview: '',content: ''})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Joe Mercer Blog Upload Tool
          <div className="App-subheader" onChange={this.setUploadType.bind(this)}>
            <input type="radio" value="Post" name="gender" /> Post
            <input type="radio" value="Project" name="gender" /> Project
          </div>
        </header>
        <div style={{display:'flex'}}>
          <div className="editor">
            <div>Title</div>
            <input type='text' value={this.state.title} onChange={this.onChangeTitle}></input>
            <div>URL Postfix</div>
            <input type='text' value={this.state.urlpostfix} onChange={this.onChangeUrlpostfix}></input>
            {this.state.uploadType === 'Post' &&
              <>
                <div>Date</div>
                <input type='date' value={this.state.date} onChange={this.onChangeDate}></input>
              </>
            }
            <div>Preview</div>
            <input type='text' value={this.state.preview} onChange={this.onChangePreview} style={{width:'40vw'}}></input>
            <div>Content</div>
            <textarea value={this.state.content} onChange={this.onChangeContent}/>
            <br />
            <button onClick={this.openUpload}>Upload</button>
            <button>Save to csv</button>
            <button>Import from csv</button>
            <button>Edit a post/project</button>
          </div>
          <div className="preview-window">
            <div className='preview-title'>{this.state.title}</div>
            <ReactMarkdown>{this.state.content.replace(/\n/g, '  \n')}</ReactMarkdown>
          </div>
        </div>
        <ReactModal
          className = 'modal'
          style={{ overlay: {background:'rgba(33,33,33,0.3)'}, content: {} }}
          isOpen={this.state.uploadOpen}
        >
            <h1>Confirm Upload</h1>
            <p1 style={{flexGrow:1}}>By confirming this your content will be uploaded.</p1>
              <p1>Are you sure?</p1>
            <div>
              <button onClick={this.upload}>Confirm Upload</button>
              <button onClick={this.closeUpload}>Cancel</button>
            </div>
        </ReactModal>
      </div>
    );
  }
}

export default App;
