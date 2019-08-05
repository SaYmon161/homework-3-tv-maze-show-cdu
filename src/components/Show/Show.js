import React, { Component } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

class Show extends Component {
  state = {
    showId: '',
    data: {}
  };

  async componentDidUpdate() {
    const { showId: propShowId } = this.props;
    const { showId: stateShowId } = this.state;
    if (propShowId === stateShowId) return;
    const data = await getShowInfo(propShowId);
    this.setState({
      data,
      showId: propShowId
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
