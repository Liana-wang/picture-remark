import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Upload, message, Modal, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReactImgEditor from 'react-img-editor'
import 'react-img-editor/assets/index.css'



function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


export default class UploadPage extends Component {
    state = {
        loading: false,
        file: null,
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    file: { ...info.file, url: imageUrl },
                    loading: false,
                }),
            );
        }
    };

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleCancel = () => this.setState({ previewVisible: false });

    render() {
        const { loading, file, previewVisible, previewTitle, previewImage } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                {
                    file ?
                        <div>
                            <ReactImgEditor
                                src={file.url}
                                // toolbar={{ items: ['rect'] }}
                                getStage={(stage) => { console.log(stage) }}
                            />
                            {/* <img src={file.url} alt="avatar" style={{ width: '100%' }} onClick={() => this.handlePreview(file)} /> */}
                        </div>
                        :
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {uploadButton}
                        </Upload>
                }
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        )
    }
}
