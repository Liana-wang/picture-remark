import React, { Component } from 'react';

export default function KFormCreate(Cmp) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {}
        }

        // 输入值变化
        handleChangeValue = (e) => {
            const { name, value } = e.target
            this.setState({
                [name]: value
            })
        }

        getFieldDecorator = (filed, option) => {
            return InputCmp => {
                return React.cloneElement(InputCmp, {
                    name: filed,
                    value: this.state[filed] || '',
                    onChange: this.handleChangeValue
                })
            }
        }

        getFieldsValue = () => {
            return { ...this.state }
        }

        getFieldValue = (filed) => {
            return this.state[filed]
        }

        render() {
            return (
                <div className={'border'}>
                    <Cmp
                        getFieldDecorator={this.getFieldDecorator}
                        getFieldsValue={this.getFieldsValue}
                        getFieldValue={this.getFieldValue}
                    />
                </div>
            )
        }
    }
}