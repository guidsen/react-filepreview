import React from 'react';

class PreviewItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.preview.completed;
  }

  render() {
    const { preview, onRemove, styles } = this.props;
    const progressBarStyles = { ...styles.progressBar, width: preview.completed ? '100%' : '0%' };
    const progressText = preview.completed ? 'Upload finished' : 'Uploading file...';

    return (
      <div style={styles.previewItem}>
        <i onClick={onRemove.bind(this, preview)} className="fa fa-close" style={styles.closeButton}></i>
        <div style={{float: 'left', width: '0px'}}>
          <img style={styles.attachmentImage} src={preview.base64} />
        </div>
        <div style={{overflow: 'hidden', width: '100%'}}>
          <div style={{paddingLeft: '55px', fontWeight: '600', marginBottom: '7px'}}>{ preview.file.name }</div>
          <div className="progress" style={styles.progressStyles}>
            <div
              className="progress-bar progress-bar-success"
              style={progressBarStyles}>
            </div>
          </div>
          <div style={{paddingLeft: '55px', marginTop: '10px'}}>{ progressText }</div>
        </div>
      </div>
    )
  }
}

export default PreviewItem;
