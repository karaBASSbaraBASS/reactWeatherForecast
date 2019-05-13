import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends React.Component {
    render(){
        const { details } = this.props;
        // delete year
        const fullDate = details.dt_txt.split(' ')[0].split('-').splice(1, 2);
        // change places of date and month
        const date = fullDate[1].concat('.'+fullDate[0]);
        // remove seconds counter
        const fullTime = details.dt_txt.split(' ')[1].split(':', 2).join(':');
        // convert kelvin to celsius
        const celsiusTemp = Math.floor(details.main.temp - 273.15);

        return (
            <div className="cardItem">
                <h3 className="heading">
                    Дата: {date} {fullTime}
                </h3>
                <div className="iconPack">
                    <img src={`http://openweathermap.org/img/w/${details.weather[0].icon}.png`} alt={details.weather[0].description}/>
                    <span className="iconcaption">
                        {details.weather[0].description}
                    </span>
                </div>
                <span className="wind">
                    Ветер: {details.wind.speed} м/с
                </span>
                <span className="temper">
                    Температура: {celsiusTemp} С
                </span>
                <span className="pressure">
                    Давление: {details.main.pressure} мм.рт.ст.
                </span>
                <span className="humidity">
                    Влажность: {details.main.humidity} %
                </span>

        </div>
        )
    }
}

Card.propTypes = {
    details: PropTypes.object.isRequired,
}

export default withRouter(Card);