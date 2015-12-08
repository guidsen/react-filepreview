import React from 'react';

class PreviewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      progress: 0,
    }
  }

  componentDidMount() {
    this.loadPreview(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadPreview(nextProps);
  }

  render() {
    const { file, styles, onRemove } = this.props;
    const { url, progress } = this.state;

    const progressText = !url ? 'Uploading file...' : 'Uploading finished';
    const progressBarStyles = { ...styles.progressBar, ...styles.progressBar, width: `${progress}%` };

    return (
      <div style={styles.previewItem}>
        <i onClick={() => onRemove(file)} style={styles.closeButton} className="fa fa-close"></i>
        <div style={{float: 'left', width: '0px'}}>
          <img style={styles.attachmentImage} src={url} />
        </div>
        <div style={{overflow: 'hidden', width: '100%'}}>
          <div style={{paddingLeft: '55px', fontWeight: '600', marginBottom: '7px'}}>{ file.name }</div>
          <div className="progress" style={styles.progress}>
            <div
              className="progress-bar progress-bar-success"
              style={progressBarStyles}>
            </div>
          </div>
          <div style={{paddingLeft: '55px', marginTop: '10px'}}>{ progressText }</div>
        </div>
      </div>
    );
  }

  loadPreview(props) {
    const { file } = props;
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onloadend = () => {
      this.setState({ url: fileReader.result, progress: 100 });
    }
  }

  resetState() {
    this.setState({ url: null, progress: 0 });
  }
}

export default PreviewItem;
