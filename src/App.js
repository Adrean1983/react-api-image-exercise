import React, { Component } from "react";
import ImageSearch from "./ImageSearch/ImageSearch";
import ImageList from "./ImageList/ImageList";

const API_KEY = "15379601-b25f754af8902b99518d61117";
// const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo`;

class App extends Component {
  state = {
    images: [],
    error: null
  };

  handleGetRequest = async e => {
    e.preventDefault();
    const searchTerm = e.target.elements.searchValue.value;
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo`;
    const request = await fetch(url);
    const response = await request.json();
    if (!searchTerm) {
      this.setState({ error: "Please Provide a Value" });
    } else {
      this.setState({ images: response.hits, error: null });
    }
  };

  render() {
    return (
      <div>
        <ImageSearch handleGetRequest={this.handleGetRequest} />
        {this.state.error !== null ? (
          <div style={{ color: "#fff", textAlign: "center" }}>{this.state.error}</div>
        ) : (
          <ImageList images={this.state.images} />
        )}
      </div>
    );
  }
}

export default App;
