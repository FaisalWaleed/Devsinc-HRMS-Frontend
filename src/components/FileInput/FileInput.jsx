import React, {Component} from 'react'

export default class FileInput  extends Component{
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
  }
  
  onChange(e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.files[0])
  }
  
  render(){
    const { input: { value } } = this.props;
    const {input,label, required, meta, } = this.props;
    return(
      <div><label>{label}</label>
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