import React from 'react';
import ReactDOM from 'react-dom';
import FilePreview from './FilePreview';

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
          multiple
          ref="fileInput"
          onChange={this.handleFileChange.bind(this)}
          type="file" />
        <FilePreview maxSize={2} maxFiles={8} files={this.state.files} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
