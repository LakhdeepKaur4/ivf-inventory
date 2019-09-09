import React, { Component } from 'react';
const config = require('../../../env');

class HostResolver extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.hostResolved(this.setHost(this.props.hostToGet))
    }

    setHost = host => {
        let url;
        if (host === 'inventory') {
            url = config.inventory.service;
            return url;
        }
        else if (host === 'voxel') {
            url = config.voxel.service;
            return url;
        }
        else if (host === 'angel') {
            url = config.angel.service;
            return url;
        }
        else if (host === 'mockup') {
            url = config.mockup.service;
            return url;
        }
        else if (host === 'minio') {
            url = config.minio.service;
            return url;
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default HostResolver;