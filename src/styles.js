const containerHeight = '50px';
const alertBox = {
  padding: '10px 15px',
  margin: '10px 0px',
  lineHeight: '20px',
  minHeight: '20px',
  borderRadius: '3px',
  fontSize: '15px',
  border: '1px solid transparent',
}

export default {
  errorBox: Object.assign(alertBox, {
    backgroundColor: '#f2dede',
    color: '#a94442',
    borderColor: '#ebccd1',
  }),
  previewContainer: {
    fontFamily: 'Helvetica',
    margin: '10px 0px',
    fontSize: '12px',
  },
  previewItem: {
    position: 'relative',
    height: containerHeight,
    marginBottom: '10px',
  },
  progress: {
    height: '4px',
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    borderRadius: '4px',
    marginLeft: '55px',
  },
  closeButton: {
    position: 'absolute',
    right: '0px',
    fontSize: '15px',
    color: 'B5B5B5',
  },
  progressBar: {
    float: 'left',
    height: '100%',
    backgroundColor: '#51D457',
    transition: '.9s all',
  },
  attachmentImage: {
    borderRadius: '2px',
    width: containerHeight,
    height: '100%',
  }
}
