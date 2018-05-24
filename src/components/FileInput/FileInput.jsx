import React, {Component} from 'react'
import Avatar from 'material-ui/Avatar';

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
      imagePreviewUrl: imageUrl
    })
  }
  
  onChange(e) {
    const { input: { onChange } } = this.props;
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      })
    };
    reader.readAsDataURL(file);
    onChange(e.target.files[0]);
  }
  
  render(){
    console.log("avatar url",this.state.imagePreviewUrl);
    const { input: { value } } = this.props;
    const {input,label, required, meta, url } = this.props;
    return(
      <div>
        <img
          style={{width: '100%', display: 'block', height: 'auto', borderRadius: '30%'}}
          src={url ? url : this.state.imagePreviewUrl }  />
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