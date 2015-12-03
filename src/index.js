import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from './FileUpload';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
    }
  }

  handleFileChange() {
    const files = this.refs.fileInput.files;
    this.setState({ files });
  }

  render() {
    return (
      <div style={{width: '300px'}}>
        <input
          ref="fileInput"
          onChange={this.handleFileChange.bind(this)}
          type="file" />
        <FileUpload maxSize={2} maxFiles={1} files={this.state.files} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
