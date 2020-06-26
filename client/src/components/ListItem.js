import React, { Component } from 'react';

class ListItem extends Component {
    render() {
        return (
            <li className={this.props.class}>
                <a href="#" class='list-link'>
                    <div className="list-wrapper">
                        {this.props.playlist}
                    </div>
                </a>
            </li>
        );
    }
}

export default ListItem;
