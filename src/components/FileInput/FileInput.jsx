import React, {Component} from 'react'

export default class FileInput  extends Component{
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      file: '',
      imagePreviewUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaBqOyevAcIrcTM2Z9YzfMHMPcDfDVepqZYPT2QDdkdGCkAaqDA'
    }
  }
  
  setUrl(imageUrl){
    this.setState({
      imagePreviewUrl: imageUrl,
      newChosen: false
    })
  }
  
  onChange(e) {
    const { input: { onChange } } = this.props;
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        newChosen: true
      })
    };
    reader.readAsDataURL(file);
    onChange(e.target.files[0]);
  }
  
  render(){
    const {input,label, url } = this.props;
    return(
      <div>
        <img
          alt="preview.png"
          style={{width: '100%', display: 'block', height: 'auto', borderRadius: '30%'}}
          src={this.state.newChosen ? this.state.imagePreviewUrl : url ? url : this.state.imagePreviewUrl}  />
        <label>{label}</label>
        <div>
          <input
            type='file'
            accept='.jpg, .png, .jpeg'
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}