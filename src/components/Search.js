import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import List from './list/List';
import { handleResponse } from '../helpers';
import responseExample from '../responseExample.json'
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();
        this.fetchLocation = this.fetchLocation.bind(this);
        this.fetchWeather = this.fetchWeather.bind(this);
        this.state = {
            loading: false,
            dates: {},
            error: null,
            location: ''
        };
    }

    componentDidMount() {
        this.fetchLocation();
        this.fetchWeather();
    }

    fetchLocation() {
        this.setState({
            loading: true
        });
        
        fetch("https://api.ipgeolocation.io/ipgeo?apiKey=6701b29ea60a42e99eef5efd851ee3fb", {
            method: 'GET'
        })
        .then(handleResponse)
        .then((data) => {
            this.setState({
                location: data.city
            })
        })
        .catch((error) => {
            this.setState({
                error: error.errorMessage,
                loading: false,
            })
        })
        .then( this.fetchWeather() );
        
    };
    fetchWeather(){
        this.setState({
            loading: true
        });
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.location}&id=524901&APPID=e3d621ebafdefe30a9372f17e5fd10d7`, {
            method: 'GET'
        })
        .then(handleResponse)
        .then((data) => {
            this.setState({
                dates: data.list,
                loading: false
            })
        })
        .catch((error) => {
            this.setState({
                error: error.errorMessage,
                loading: false,
            })
        });
    };

    handleChange = (e) => {
        this.setState({
            location: e.target.value
        })
    }
   
   
    render() {
        return (
            <div>
                <form>
                    <div className="Search">
                        <span className="Search-icon"/>
                        <div className="inputWrap">
                            <input
                                className="Search-input"
                                type="text"
                                placeholder="Введите местоположение"
                                value={this.state.location}
                                onChange={e => this.handleChange(e)}
                            />
                            <span className="bottom"></span>
                            <span className="right"></span>
                            <span className="top"></span>
                            <span className="left"></span>
                        </div>
                        
                            <div className="Search-loading">
                                <Loading
                                    width='12px'
                                    height='12px'
                                />
                            </div>
                        
                        {/* {this.renderSearchResult()} */}
                    </div>
                    <div className="searchButtons">
                        <button 
                            type="button" 
                            className="button mylocation"
                            onClick={this.fetchLocation}
                        >
                            По моему местоположению
                        </button>
                        <button 
                            type="button" 
                            className="button search"
                            onClick={this.fetchWeather}
                        >
                            Искать!
                        </button>
                    </div>
                </form>
                <List
                    loading={this.state.loading}
                    dates={this.state.dates}
                    error={this.state.error}
                    location={this.state.location}
                />
            </div>
            
        )
    }
}

export default withRouter(Search);