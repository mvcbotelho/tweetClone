import React, { Component } from "react";
import api from "../services/api";
import socket from 'socket.io-client'

import TwitterLogo from "../twitter.svg";
import "./Timeline.css";

import Tweet from "../components/Tweet";

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ""
  };

  async componentDidMount() {
    this.subscribeToEvents()
    const response = await api.get("tweets");

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3000')

    io.on('tweet', data => {
      console.log(data)
    })

    io.on('like', data => {
      console.log(data)
    })
  }

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value });
  };

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem("@GoTwitter:userame");

    await api.post("tweets", { content, author });

    this.setState({ newTweet: "" });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={TwitterLogo} alt="GoTwitter" />
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>
        <ul className='tweet-list'>
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
