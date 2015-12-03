/**
 * File preview component.
 * @module components/FilePreview
 * @author Flex Appeal
 * @licstart The following is the entire license notice for the JavaScript
 *           code in this page.
 *
 * Copyright (C) 2015 Flex Appeal. All rights reserved.
 *
 * @licence The above is the entire license notice for the JavaScript code in
 *          this page.
 */
import React, { Component, PropTypes } from 'react';
import PreviewItem from './PreviewItem';
import 'font-awesome/less/font-awesome.less';
import styles from './styles';

/**
 * File preview component.
 * @class FilePreview
 */
export default class FilePreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      previews: [],
    };
  }

  /**
   * Property types.
   * @property {object} propTypes Property types
   * @static
   */
  static propTypes = {
    maxSize: PropTypes.number,
    maxFiles: PropTypes.number,
    files: PropTypes.object.isRequired,
  }

  /**
   * Handler when component will receive props.
   * @param {object} nextProps
   * @method componentWillReceiveProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.files.length === 0) {
      this.clearFiles();
    }

    this.getPreviews(nextProps);
  }

  /**
   * Removes the clicked preview from the state.
   * @method onHandleRemove
   * @param {number} removeIndex The index of the preview
   * @event
   */
  handleRemove(previewToRemove) {
    const newPreviews = this.state.previews.filter(preview => {
      return preview.file.timestamp !== previewToRemove.file.timestamp;
    });

    this.setState({
      previews: newPreviews,
    });

    if (this.props.onRemove) {
      this.props.onRemove(previewToRemove);
    }
  }

  /**
   * Render method.
   * @method render
   * @return {object} Markup of the component
   */
  render() {
    const items = this.state.previews.map((preview, index) => {
      const progressStyles = { ...styles.progress, display: this.state.previews.length > 0 ? 'block' : 'none' };
      const uploadText = preview.file.progress === 100 ? 'Upload finished' : 'Uploading file..';

      const previewItemStyles = Object.assign(styles, { progressStyles });

      if (!preview.valid) {
        return <div key={index} style={styles.errorBox}>{ preview.errorMessage }</div>;
      }

      return <PreviewItem key={index} preview={preview} onRemove={this.handleRemove.bind(this)} styles={previewItemStyles} />;
    });

    return (
      <div style={styles.previewContainer}>
        {items}
      </div>
    );
  }

  /**
   * Get the previews of the files.
   * @method getPreviews
   * @param {array} files Array of File objects
   */
  getPreviews({ maxSize, maxFiles, files }) {
    if (this.state.previews.length < maxFiles) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        file.timestamp = new Date();
        file.progress = 0;
        file.base64 = null;

        const previews = [ ...this.state.previews, { file, completed: false, valid: true } ];
        this.setState({ previews });

        const isTooLarge = file.size > maxSize * 1048576;
        const isWrongType = file.type !== 'image/png' && file.type !== 'image/jpg';

        if (isTooLarge || isWrongType) {
          const newPreviews = previews.map(preview => {
            if (preview.file.timestamp === file.timestamp) {
              preview.valid = false;

              if (isWrongType) {
                preview.errorMessage = `Het bestand mag alleen .png of .jpg zijn.`;
              }

              if (isTooLarge) {
                preview.errorMessage = `Het bestand mag maximaal ${maxSize}MB bevatten.`;
              }
            }

            return preview;
          });

          return this.setState({ previews: newPreviews });
        }

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onloadend = () => {
          const newPreviews = this.state.previews.map(preview => {
            if (preview.file.timestamp === file.timestamp) {
              preview.base64 = fileReader.result;
              preview.completed = true;
            }

            return preview;
          });

          this.setState({ loading: false, previews: newPreviews });
        }
      };
    }
  }

  /**
   * Clear all the previews from the state.
   * @method clearFiles
   */
  clearFiles() {
    this.setState({previews: []});
  }
}
