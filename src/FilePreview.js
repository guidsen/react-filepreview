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
      files: [],
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

  componentWillReceiveProps(nextProps) {
    this.setState({ files: this.fileListToArray(nextProps.files) });
  }

  /**
   * Removes the clicked file from the state.
   * @method handleRemove
   * @param {number} removeIndex The index of the preview
   * @event
   */
  handleRemove(fileToRemove) {
    this.setState({ files: this.state.files.filter(file => {
      return file.name !== fileToRemove.name;
    })});
  }

  /**
   * Render method.
   * @method render
   * @return {object} Markup of the component
   */
  render() {
    const { files } = this.state;

    const validationMessages = this.createValidationMessages(files);
    if (validationMessages.length > 0) {
      return <div style={styles.errorBox}>{ validationMessages.shift() }</div>
    }

    const items = files.map((file, index) => {
      return <PreviewItem key={index} file={file} onRemove={this.handleRemove.bind(this)} styles={styles} />;
    });

    return (
      <div style={styles.previewContainer}>
        {items}
      </div>
    );
  }

  fileListToArray(fileList) {
    const arr = [];

    for (let i = 0; i < fileList.length; i++) {
        arr.push(fileList.item(i));
    }

    return arr;
  }

  createValidationMessages(files) {
    const { maxSize } = this.props;
    const validationMessages = [];

    files.forEach(file => {
      if (!this.isValidType(file)) {
        validationMessages.push('Het bestand mag alleen .png of .jpg zijn.');
      }

      if (!this.hasValidSize(file, maxSize)) {
        validationMessages.push(`Het bestand mag maximaal ${maxSize}MB bevatten.`);
      }
    });

    return validationMessages;
  }

  hasValidSize(file, maxSizeInMb) {
    return file.size < maxSizeInMb * 1048576;
  }

  isValidType(file) {
    console.log('type', file.type);
    return file.type == 'image/png' || file.type == 'image/jpg';
  }

  /**
   * Clear all the previews from the state.
   * @method clearFiles
   */
  clearFiles() {
    this.setState({previews: []});
  }
}
