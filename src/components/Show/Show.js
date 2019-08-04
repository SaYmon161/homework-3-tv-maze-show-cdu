import React, { Component } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

class Show extends Component {
  state = {
    showId: '',
    data: {}
  };

  async componentDidUpdate() {
    if (this.props.showId === this.state.showId) return;
    const data = await getShowInfo(this.props.showId);
    this.setState({
      data,
      showId: this.props.showId
    });
  }
  getImg(name) {
    return require(`../App/assets/${name}.jpg`);
  }

  createMarkup(htmlMarkup) {
    return { __html: htmlMarkup };
  }

  render() {
    const {
      showId,
      data: { name, genres, summary }
    } = this.state;
    if (showId) {
      return (
        <div className="show">
          <img src={this.getImg(showId)} alt={showId} className="show-image" />
          <h2 className="show-label t-show-name">{name}</h2>
          <p className="show-text t-show-genre">
            <b>Жанр: </b>
            {genres.join(', ')}
          </p>
          <p
            className="show-text t-show-summary"
            dangerouslySetInnerHTML={this.createMarkup(summary)}
          />
        </div>
      );
    } else {
      return <p className="show-inforation t-show-info">Шоу не выбрано</p>;
    }
  }
}

export default Show;
